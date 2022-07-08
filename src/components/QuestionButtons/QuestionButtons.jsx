import React, {useContext} from 'react';
import { AppContext } from '../../context/AppContext';
import s from './QuestionButtons.module.css';
import PrimaryButton from '../PrimaryButton/PrimaryButton.jsx';

const QuestionButtons = () => {
    const [state,dispatch] = useContext(AppContext);

    const checkQuestions = () => state.questions.some(question => !question.isAnswered);

    const nextView = () => {
        if (!checkQuestions() && state.isLastQuestion) {
            //submit answers
            alert('respuestas enviadas');
            console.log(state.questions);
        }
        if (state.isLastQuestion) return;
        dispatch({type: 'SET_STEP', payload: 'next'});
    };

    const prevView = () => {
        if (state.isFirstQuestion) return;
        dispatch({type: 'SET_STEP', payload: 'prev'});
    };
  
    return (
        <div className={s.buttons_container}>
            <PrimaryButton onClick={prevView} disabled={state.recording || state.isFirstQuestion} text={!state.isFirstQuestion ? 'Anterior' : 'Anterior'}/>
            <PrimaryButton onClick={nextView} disabled={state.recording || (state.isLastQuestion && checkQuestions())} text={!state.isLastQuestion ? 'Siguiente' : checkQuestions() ? 'Faltan preguntas' : 'Enviar respuestas'}/>
        </div>
    );
};

export default QuestionButtons;