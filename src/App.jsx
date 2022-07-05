import React, {useContext} from 'react';
import Layout from './views/Layout/Layout';
import {AppContext} from './context/AppContext';
import QuestionView from './views/QuestionView/QuestionView';
import {steps} from './constants';
import MainView from './views/MainView/MainView';

function App() {
    const [state] = useContext(AppContext);

    let content = null;



    if (state.actualStep === steps.MainView) {
        content = <MainView />;
    }

    if(steps.QuestionView.includes(state.actualStep)) {
        content = <QuestionView />;
    }

    return (
        <Layout>
            {content}
        </Layout>
    );
}

export default App;
