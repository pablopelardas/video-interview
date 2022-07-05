import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer, initialState } from './reducer';

export const AppContext = React.createContext();

const AppProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={[state, dispatch]}>
            {children}
        </AppContext.Provider>
    );
};

AppProvider.propTypes = {
    children: PropTypes.node,
};

export default AppProvider;