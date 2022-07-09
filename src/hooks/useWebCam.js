import {useState, useEffect, useRef, useContext} from 'react';
import {AppContext} from '../context/AppContext.jsx';
import { SET_LOADING, SET_RECORDING, SET_VIDEO_ANSWER } from '../context/action-types.js';
import { steps } from '../constants.js';
 


const useWebCam = () => {
    const [state, dispatch] = useContext(AppContext);
    const [buttonState, setButtonState] = useState('Grabar');
    const [timer,  setTimer] = useState(0);
    const buttonRef = useRef(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const streamRecorderRef = useRef(null);
    const recordTimerRef = useRef(null);
    const [audioSource] = useState(null);
    const [videoSource] = useState(null);
    const [error, setError] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const playingRef = useRef(null);
    const chunks = useRef([]);
    const actualQuestion = state.questions[state.actualStep-1];

    const prepareStream = async () => {
        dispatch({type: SET_LOADING, payload: true});
        const gotStream = (stream) =>{
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.controls = false;
                videoRef.current.muted = true;
                if (!isPlaying)videoRef.current.play();
                dispatch({type: SET_LOADING, payload: false});
                if (buttonRef.current) buttonRef.current.disabled = false;
            }
        };

        const getStream = async () => {
            if (buttonRef.current) buttonRef.current.disabled = true;
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
        await getStream();
    };

    const handleButtonClick = async () => {
        if (!buttonRef.current) return;
        if (buttonState === 'Regrabar'){
            if (!streamRef.current){
                videoRef.current.src = false;
                await prepareStream();
            } 
            dispatch({type: SET_VIDEO_ANSWER, payload: {id: state.actualStep, isAnswered: false, answer: ''}});
            videoRef.current.src = null;
            setTimer(0);
            setIsPlaying(false);
            clearInterval(playingRef.current);
        } 
        if (buttonState === 'Grabar'){
            if (!streamRef.current) await prepareStream();
        } 
        handleRecord();
          
    };

    const handleRecord = async () => {
        if (isRecording) await stopRecording();
        else startRecording();
    };

    const startRecording = async () => {
        chunks.current = [];
        clearInterval(recordTimerRef.current);
        setTimer(0);
        // await prepareStream();
        if (isRecording) return;
        if (!streamRef.current) return;
        if (!videoRef.current) return;
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.controls = false;
        videoRef.current.play();
        streamRecorderRef.current = new MediaRecorder(streamRef.current);
        streamRecorderRef.current.start();
        streamRecorderRef.current.ondataavailable = (e) => {
            if (chunks.current) chunks.current.push(e.data);
        };
        setIsRecording(true);
        setButtonState('Detener');
    };
    const stopRecording = async () => {
        if (!streamRecorderRef.current)return;
        streamRecorderRef.current.stop();
        setIsRecording(false);
        clearInterval(recordTimerRef.current);
        await dispatch({type: SET_VIDEO_ANSWER, payload: {id: state.actualStep, isAnswered: true, answer: chunks.current, duration: timer}});
        setButtonState('Regrabar');
        streamRecorderRef.current = null;
    };

    const play = () => {
        const blob = new Blob(actualQuestion.answer, {type: 'video/webm'});
        if (!videoRef.current) return;
        videoRef.current.srcObject = null;
        videoRef.current.src = URL.createObjectURL(blob);
        videoRef.current.autoplay = true;
        videoRef.current.muted = false;
        setIsPlaying(true);
        setTimer(0);
        videoRef.current.play();
    };

    const replay = () => {
        if (!videoRef.current.src) return;
        setIsPlaying(true);
        setTimer(0);
        videoRef.current.play();
    };

    useEffect(() => {return () => {
        if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
        if (streamRecorderRef.current) streamRecorderRef.current.stop();
        if (videoRef.current) videoRef.current.src = null;
        if (recordTimerRef.current) clearInterval(recordTimerRef.current);
        if (playingRef.current) clearInterval(playingRef.current);
        streamRef.current = null;
    };}, []);

    useEffect(() => {
        if (!actualQuestion?.isAnswered) {
            if (state.prevStep == steps.MainView) prepareStream();
            else videoRef.current.src = null;
        }
        actualQuestion.isAnswered ? setButtonState('Regrabar') : setButtonState('Grabar');
        setTimer(0);
        setIsPlaying(false);
        clearInterval(playingRef.current);
        videoRef.current.srcObject = streamRef.current;
        getAnswer();

    },[state.actualStep]);


    const getAnswer = () => {
        const int = setInterval(() => {
            if (actualQuestion?.isAnswered && !state.loading) {
                clearInterval(int);
                play();
            }
        }, 10);
    };

    useEffect(() => {
        if (isRecording) {
            dispatch({type: SET_RECORDING, payload: true});
            recordTimerRef.current = setInterval(() => {
                setTimer(timer => timer + 1);
            }, 1000);
        }
        if (!isRecording) {
            dispatch({type: SET_RECORDING, payload: false});
            setTimer(0);
            clearInterval(recordTimerRef.current);
            getAnswer();
        }
        return () => clearInterval(recordTimerRef.current);
    },[isRecording]);

    useEffect(() => {
        if (isRecording){
            if (timer >= 120){
                stopRecording();
                setTimer(0);
                clearInterval(recordTimerRef.current);
            }
        }
    }, [timer]);

    useEffect(() => {
        if (isPlaying) {
            playingRef.current = setInterval(() => {
                setTimer(timer => timer + 1);
                if (timer === actualQuestion.duration || videoRef.current.paused) {
                    setTimer(actualQuestion.duration);
                    clearInterval(playingRef.current);
                    setIsPlaying(false);
                }
            }, 1000);
            return () => clearInterval(playingRef.current);
        }
    },[isPlaying]);

    return {buttonRef, videoRef, error, handleButtonClick, buttonState, replay, prepareStream, timer, isRecording, isPlaying, play};
};

export default useWebCam;