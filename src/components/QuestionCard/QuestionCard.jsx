import React from 'react';
import s from './QuestionCard.module.css';
import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { getFormattedTime } from '../../utils/getFormattedTime';

const QuestionCard = ({question, dispatch}) => {
    const videoRef = React.useRef(null);
    const [buttonState, setButtonState] = React.useState('Grabar');
    const buttonRef = React.useRef();

    const handleButtonClick = () => {
        if (!videoRef.current.src) return;
        if (buttonState === 'Grabar'){
            setButtonState('Detener');
            videoRef.current.play();
        }else{
            setButtonState('Grabar');
        }
    };

    const showVideo = async () => {
        const blob = new Blob(question.answer, {type: 'video/mp4'});
        videoRef.current.src = null;
        videoRef.current.srcObject = null;
        videoRef.current.src = URL.createObjectURL(blob);
    };

    React.useEffect(() => {
        if (question.isAnswered) showVideo();
    }, []);

    const handleClick = (e) => {
        if(e.target.tagName === 'BUTTON' || e.target.tagName === 'svg' || e.target.tagName === 'path') return;
        videoRef.current.pause();
        videoRef.current.src = null;
        videoRef.current.srcObject = null;
        dispatch({type: 'SET_STEP', payload: question.id});
    };

    return (
        <article className={s.card_container} onClick={handleClick}>
            <div className={s.video}>
                <video ref={videoRef}/>
                <div className={s.card_button} id={'button-container'}>
                    <PrimaryButton id={'button'}ref={buttonRef} onClick={handleButtonClick} video={true} icon={buttonState}/>
                    <span className={s.video_duration}>{question.duration === 0 ? null : getFormattedTime(question.duration)}</span>
                </div>
            </div>
            <div className={s.question}>
                <p>{question.message}</p>
            </div>
        </article>
    );
};

QuestionCard.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.number,
        message: PropTypes.string,
        answer: PropTypes.array,
        isAnswered: PropTypes.bool,
        duration: PropTypes.number
    }),
    dispatch: PropTypes.func,
};

export default QuestionCard;