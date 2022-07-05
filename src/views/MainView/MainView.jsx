import React from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import s from './MainView.module.css';
const MainView = () => {

    return (
        <section className={s.mainview_container}>
            <h1>Video Cuestionario</h1>
            <section className={s.card_container}>
                <QuestionCard/>
                <QuestionCard/>
                <QuestionCard/>
                <QuestionCard/>
                <QuestionCard/>
                <QuestionCard/>
                <QuestionCard/>
                <QuestionCard/>
            </section>
        </section>
    );
};

export default MainView;