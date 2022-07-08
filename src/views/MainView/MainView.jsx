import React, {useContext} from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import s from './MainView.module.css';
import { AppContext } from '../../context/AppContext';
const MainView = () => {
    const [state, dispatch] = useContext(AppContext);
    return (
        <section className={s.mainview_container}>
            <h1 className={s.main_title}>Video Cuestionario</h1>
            <p className={s.instructions}>Clickea la carta que quieras empezar respondiendo, al responder todas podrás enviar tus respuestas.</p>
            <section className={s.card_container}>
                {
                    state.questions.map(question => {
                        return <QuestionCard key={`${question.id} card`} dispatch={dispatch} question={question}/>;
                    })
                }
            </section>
        </section>
    );
};

export default MainView;