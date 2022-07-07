import {useState, useEffect, useRef, useContext} from 'react';
import {AppContext} from '../context/AppContext.jsx';
import { SET_VIDEO_ANSWER } from '../context/action-types.js';
 


const useWebCam = () => {
    const [state, dispatch] = useContext(AppContext);
    const [buttonState, setButtonState] = useState('Grabar');
    const buttonRef = useRef(null);
    const videoRef = useRef(null);
    const recordedRef = useRef(null);
    const streamRef = useRef(null);
    const streamRecorderRef = useRef(null);
    const recordTimerRef = useRef(null);
    const [audioSource] = useState(null);
    const [videoSource] = useState(null);
    const [error, setError] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const chunks = useRef([]);
    const actualQuestion = state.questions[state.actualStep-1];


    const prepareStream = async () => {
        if (buttonRef.current) buttonRef.current.disabled = true;
        const gotStream = (stream) =>{
            streamRef.current = stream;
            if(videoRef.current){
                videoRef.current.srcObject = stream;
                videoRef.current.controls = false;
            } 
        };

        const getStream = async () => {
            if (streamRef.current){
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            const constraints = {
                audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
                video: {deviceId: videoSource ? {exact: videoSource} : undefined}
            };
            try{
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                gotStream(stream);
            }catch(e){
                setError(e);
            }
        };
        if (actualQuestion.answer.length > 0){
            chunks.current = [];
            if (buttonRef.current) buttonRef.current.disabled = false;
            return play();
        }else{
            recordedRef.current = null;
            await getStream();
            if (buttonRef.current) buttonRef.current.disabled = false;
        }
    };

    const handleButtonClick = async () => {
        if (!buttonRef.current) return;
        if (buttonState === 'Regrabar') return handleRecord();
        if (!actualQuestion.isAnswered) handleRecord();
    };

    const handleRecord = async () => {
        if (isRecording) await stopRecording();
        else startRecording();
    };

    const startRecording = async () => {
        dispatch({type: SET_VIDEO_ANSWER, payload: {id: state.actualStep, isAnswered: false, answer: ''}});
        setButtonState('Detener');
        chunks.current = [];
        await prepareStream();
        if (isRecording) return;
        if (!streamRef.current) return;
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.controls = false;

        streamRecorderRef.current = new MediaRecorder(streamRef.current);
        streamRecorderRef.current.start();
        streamRecorderRef.current.ondataavailable = (e) => {
            if (chunks.current) chunks.current.push(e.data);
        };
        setIsRecording(true);
        recordTimerRef.current = setTimeout(() => {
            alert('Se ha superado el tiempo de grabación');
            stopRecording();
        },1000 * 60 * 2); // 2 minutes
    };
    const stopRecording = async () => {
        if (!streamRecorderRef.current)return;
        streamRecorderRef.current.stop();
        clearTimeout(recordTimerRef.current);
        setIsRecording(false);
        await dispatch({type: SET_VIDEO_ANSWER, payload: {id: state.actualStep, isAnswered: true, answer: chunks.current}});
        setButtonState('Regrabar');
        play(chunks.current);
    };

    const play = async () => {
        const blob = new Blob(actualQuestion.answer, {type: 'video/webm'});
        if (!recordedRef.current) return;
        recordedRef.current.src = null;
        recordedRef.current.srcObject = null;
        recordedRef.current.src = URL.createObjectURL(blob);
        recordedRef.current.controls= true;
        recordedRef.current.play();
    };

    useEffect(() => {
        prepareStream();
        actualQuestion.isAnswered ? setButtonState('Regrabar') : setButtonState('Grabar');
        return () => {
            if (streamRef.current){
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    },[state.actualStep]);

    useEffect(() => {
        if (!buttonRef.current) return;
    }, [buttonState]);

    useEffect(() => {
        const int = setInterval(() => {
            if (actualQuestion.isAnswered) {
                clearInterval(int);
                play();
            }
        }, 10);
        return () => clearInterval(int);
    }, [actualQuestion.answer]);

    return {buttonRef, videoRef, recordedRef, error, handleButtonClick, buttonState};
};

export default useWebCam;