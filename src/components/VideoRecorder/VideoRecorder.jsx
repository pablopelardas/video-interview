import React, { useContext } from 'react';
import s from './VideoRecorder.module.css';
import useWebCam from '../../hooks/useWebCam';
import {AppContext} from '../../context/AppContext.jsx';
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx';

const VideoRecorder = () => {
    const [state] = useContext(AppContext);
    const actualQuestion = state.questions[state.actualStep-1];
    const {buttonRef, videoRef, recordedRef, error, handleButtonClick, buttonState} = useWebCam();

    return (
        <section className={s.video_container}>
            <div className={s.video}>
                {
                    actualQuestion?.isAnswered
                        ? <video ref={recordedRef} />
                        : <video ref={videoRef} autoPlay muted />     
                }
                <div className={s.buttons_container}>
                    <PrimaryButton ref={buttonRef} onClick={handleButtonClick} video={true} icon={buttonState}/>
                </div>
            </div>
            {error && <p>{error.message}</p>}
        </section>
    );    
};

export default VideoRecorder;