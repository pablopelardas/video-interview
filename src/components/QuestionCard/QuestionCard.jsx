import React from 'react';
import s from './QuestionCard.module.css';
import PropTypes from 'prop-types';

const QuestionCard = ({question, dispatch}) => {
    const videoRef = React.useRef();

    const showVideo = () => {
        const blob = new Blob(question.answer, {type: 'video/mp4'});
        videoRef.current.src = null;
        videoRef.current.srcObject = null;
        videoRef.current.src = URL.createObjectURL(blob);
        videoRef.current.controls = true;
    };

    React.useEffect(() => {
        if (question.isAnswered) showVideo();
    }, []);

    const handleClick = () => {
        dispatch({type: 'SET_STEP', payload: question.id});
    };

    return (
        <article className={s.card_container} onClick={handleClick}>
            <div className={s.video}>
                <video ref={videoRef} muted/>
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
    }),
    dispatch: PropTypes.func,
};

export default QuestionCard;