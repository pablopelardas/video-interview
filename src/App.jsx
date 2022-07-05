import React, {useContext} from 'react';
import Layout from './views/Layout/Layout';
import {AppContext} from './context/AppContext';
import QuestionButtons from './components/QuestionButtons/QuestionButtons';
import {steps} from './constants';
import MainView from './views/MainView/MainView';

function App() {
    const [state,dispatch] = useContext(AppContext);

    let content = null;

    const mainView = () => {
        dispatch({type: 'SET_STEP', payload: steps.MainView});   
    };

    if (state.actualStep === steps.MainView) {
        content = <MainView />;
    }

    if(steps.QuestionView.includes(state.actualStep)) {
        content = (
            <>
                <h1>Question View</h1>
                <button onClick={mainView}>Main View</button>
                <QuestionButtons/>
            </>
        );
    }

    return (
        <Layout>
            {content}
        </Layout>
    );
}

export default App;
