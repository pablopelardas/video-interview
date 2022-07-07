import React, {useContext} from 'react';
import QuestionButtons from '../../components/QuestionButtons/QuestionButtons';
import {AppContext} from '../../context/AppContext';
import { steps } from '../../constants';
import s from './QuestionView.module.css';
import VideoRecorder from '../../components/VideoRecorder/VideoRecorder';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton.jsx';

const QuestionView = () => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContext(AppContext);  

    const goToMainView = () => {
        dispatch({type: 'SET_STEP', payload: steps.MainView});   
    };

    return (
        <section className={s.question_view_container}>
            <PrimaryButton onClick={goToMainView} text={'Main View'}/>
            <VideoRecorder />            
            <QuestionButtons/>
        </section>
    );
};

export default QuestionView;