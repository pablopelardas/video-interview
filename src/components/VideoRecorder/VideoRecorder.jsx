import React, { useEffect, useContext } from 'react';
import s from './VideoRecorder.module.css';
import useWebCam from '../../hooks/useWebCam';
import {AppContext} from '../../context/AppContext.jsx';

const VideoRecorder = () => {
    const [state, dispatch] = useContext(AppContext);
    const actualQuestion = state.questions[state.actualStep-1];
    const {videoRef, recordedRef, error, isRecording, handleRecord, play, prepareStream} = useWebCam();
    console.log(actualQuestion);
    useEffect(() => {prepareStream();},[state.actualStep]);
    return (
        <section className={s.video_container}>
            {
                actualQuestion?.isAnswered
                    ? <video ref={recordedRef} autoPlay muted className={s.video}/>
                    : <video ref={videoRef} autoPlay className={s.video}/>
            }
            <button onClick={handleRecord}>Grabar</button>
            <button onClick={play} disabled={isRecording}>Play</button>
            {error && <p>{error.message}</p>}
        </section>
    );    
};

export default VideoRecorder;