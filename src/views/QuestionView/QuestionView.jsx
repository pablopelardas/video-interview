import React, {useContext} from 'react';
import QuestionButtons from '../../components/QuestionButtons/QuestionButtons';
import {AppContext} from '../../context/AppContext';
import { steps } from '../../constants';
import s from './QuestionView.module.css';
import aux from '../../components/QuestionButtons/QuestionButtons.module.css';
import VideoRecorder from '../../components/VideoRecorder/VideoRecorder';

const QuestionView = () => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContext(AppContext);  

    const mainView = () => {
        dispatch({type: 'SET_STEP', payload: steps.MainView});   
    };

    return (
        <section className={s.question_view_container}>
            <button className={aux.button} onClick={mainView}>Main View</button>
            <VideoRecorder />            
            <QuestionButtons/>
        </section>
    );
};

export default QuestionView;