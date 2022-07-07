import React, {useContext} from 'react';
import { AppContext } from '../../context/AppContext';
import s from './QuestionButtons.module.css';
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx';

const QuestionButtons = () => {
    const [state,dispatch] = useContext(AppContext);

    const nextView = () => {
        if (state.isLastQuestion) return;
        dispatch({type: 'SET_STEP', payload: 'next'});
    };

    const prevView = () => {
        if (state.isFirstQuestion) return;
        dispatch({type: 'SET_STEP', payload: 'prev'});
    };
  
    return (
        <div className={s.buttons_container}>
            <PrimaryButton onClick={prevView} text={!state.isFirstQuestion ? 'Previous' : 'Start'}/>
            <PrimaryButton onClick={nextView} text={!state.isLastQuestion ? 'Next' : 'End'}/>
        </div>
    );
};

export default QuestionButtons;