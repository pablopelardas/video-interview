import React, {useContext} from 'react';
import QuestionButtons from '../../components/QuestionButtons/QuestionButtons';
import {AppContext} from '../../context/AppContext';
import { steps } from '../../constants';

const QuestionView = () => {
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useContext(AppContext);  

    const mainView = () => {
        dispatch({type: 'SET_STEP', payload: steps.MainView});   
    };

    return (
        <section>
            <button onClick={mainView}>Main View</button>
            <QuestionButtons/>
        </section>
    );
};

export default QuestionView;