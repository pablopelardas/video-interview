import React, {useContext} from 'react';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import s from './MainView.module.css';
import { AppContext } from '../../context/AppContext';
const MainView = () => {
    const [state, dispatch] = useContext(AppContext);
    return (
        <section className={s.mainview_container}>
            <h1>Video Cuestionario</h1>
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