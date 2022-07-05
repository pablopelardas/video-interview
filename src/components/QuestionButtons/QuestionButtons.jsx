import React, {useContext} from 'react';
import { AppContext } from '../../context/AppContext';

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
        <div>
            <button onClick={prevView}>{!state.isFirstQuestion ? 'Previous' : 'Start'}</button>
            <button onClick={nextView}>{!state.isLastQuestion ? 'Next' : 'End'}</button>
        </div>
    );
};

export default QuestionButtons;