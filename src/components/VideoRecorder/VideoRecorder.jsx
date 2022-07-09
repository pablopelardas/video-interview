import React, { useContext } from 'react';
import s from './VideoRecorder.module.css';
import useWebCam from '../../hooks/useWebCam';
import {AppContext} from '../../context/AppContext.jsx';
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx';
import { Skeleton } from '@mui/material';
import { getFormattedTime } from '../../utils/getFormattedTime';

const VideoRecorder = () => {
    const [state] = useContext(AppContext);
    const actualQuestion = state.questions[state.actualStep-1];
    const {buttonRef, videoRef, error, handleButtonClick, buttonState, replay, timer, isRecording, isPlaying} = useWebCam();

    React.useEffect(() => {}, [state.loading]);
    React.useEffect(() => {if (!actualQuestion?.isAnswered) videoRef.current.muted = true;},[actualQuestion?.isAnswered]);

    const content = state.loading
        ? <Skeleton className={s.skeleton} variant="rectangular" />
        : (
            <>
                <div className={s.video}>
                    <div className={s.timer_container}>
                        <span className={s.timer}>{isRecording ? `${getFormattedTime(timer)} / 02:00` : `${getFormattedTime(timer)} / ${getFormattedTime(actualQuestion.duration)}`}</span>
                        {isRecording && <span className={s.recording_circle}></span>}
                    </div>
                    <video ref={videoRef} autoPlay muted onClick={replay} />  
                    <div className={s.buttons_container}>
                        <PrimaryButton ref={buttonRef} onClick={handleButtonClick} video={true} icon={buttonState}/>
                        {(!isPlaying && actualQuestion.isAnswered) && <PrimaryButton ref={buttonRef} onClick={replay} video={true} icon={'Grabar'}/>}
                    </div>
                </div>
                <div className={s.question}>
                    {actualQuestion.message}
                </div>
            </>
        );

    return (
        <section className={s.video_container}>
            {content}

            {error && <p>{error.message}</p>}
        </section>
    );    
};

export default VideoRecorder;