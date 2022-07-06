import {useState, useEffect, useRef, useContext} from 'react';
import {AppContext} from '../context/AppContext.jsx';
import { SET_VIDEO_ANSWER } from '../context/action-types.js';


const useWebCam = () => {
    const [state, dispatch] = useContext(AppContext);
    const videoRef = useRef(null);
    const recordedRef = useRef(null);
    const streamRef = useRef(null);
    const streamRecorderRef = useRef(null);
    const [audioSource] = useState(null);
    const [videoSource] = useState(null);
    const [error, setError] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const chunks = useRef([]);

    const prepareStream = async () => {
        const gotStream = (stream) =>{
            streamRef.current = stream;
            if(videoRef.current) videoRef.current.srcObject = stream;
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
        if (state.questions[state.actualStep-1].answer.length > 0){
            chunks.current = [];
            return play();
        }else{
            recordedRef.current = null;
            await getStream();
        }
    };

    const handleRecord = async () => {
        if (isRecording) await stopRecording();
        else startRecording();
    };

    const startRecording = () => {
        chunks.current = [];
        if (isRecording) return;
        if (!streamRef.current) return;

        streamRecorderRef.current = new MediaRecorder(streamRef.current);
        streamRecorderRef.current.start();
        streamRecorderRef.current.ondataavailable = (e) => {
            if (chunks.current) chunks.current.push(e.data);
        };
        setIsRecording(true);
    };
    const stopRecording = async () => {
        if (!streamRecorderRef.current)return;
        streamRecorderRef.current.stop();
        setIsRecording(false);
        dispatch({type: SET_VIDEO_ANSWER, payload: {id: state.actualStep, isAnswered: true, answer: chunks.current}});
    };

    const play = () => {
        console.log(chunks.current);
        const blob = new Blob(state.questions[state.actualStep-1].answer, {type: 'video/webm'});
        if (!recordedRef.current) return;
        console.log(chunks.current);
        recordedRef.current.src = null;
        recordedRef.current.srcObject = null;
        recordedRef.current.src = URL.createObjectURL(blob);
        recordedRef.current.controls= true;
        recordedRef.current.play();
    };

    useEffect(() => {
        prepareStream();
    },[]);


    return {videoRef,recordedRef, error, isRecording, handleRecord, play, prepareStream};
};

export default useWebCam;