import React from 'react';
import s from './QuestionCard.module.css';
import PropTypes from 'prop-types';

const QuestionCard = ({question, dispatch}) => {

    const handleClick = () => {
        dispatch({type: 'SET_STEP', payload: question.id});
    };

    return (
        <article className={s.card_container} onClick={handleClick}>
            <div className={s.video}>
                {/* Video */}
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
        isAnswered: PropTypes.bool,
    }),
    dispatch: PropTypes.func,
};

export default QuestionCard;