import React, {useContext} from 'react';
import s from './QuestionCard.module.css';
import { AppContext } from '../../context/AppContext';
const QuestionCard = () => {

    // eslint-disable-next-line no-unused-vars
    const [state,dispatch] = useContext(AppContext);

    const handleClick = () => {
        dispatch({type: 'SET_STEP', payload: 'next'});
    };

    return (
        <article className={s.card_container} onClick={handleClick}>
            <div className={s.video}>
                {/* Video */}
            </div>
            <div className={s.question}>
                <p>la pregunta</p>
            </div>
        </article>
    );
};

export default QuestionCard;