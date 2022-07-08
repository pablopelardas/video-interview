import React, {useContext} from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import s from './MainView.module.css';
import { AppContext } from '../../context/AppContext';
const MainView = () => {
    const [state, dispatch] = useContext(AppContext);
    return (
        <section className={s.mainview_container}>
            <h1 className={s.main_title}>Video Cuestionario</h1>
            <p className={s.instructions}>Clickea en las tarjetas para ir respondiendo las preguntas, los videos tienen una duración máxima de <span>2 minutos</span>, cuando termines de responder todas podrás enviar tus respuestas a nuestra base de datos.</p>
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