import { useReducer } from 'react';

import Context from './Context';
import { InitState, reducer } from '../reducer';


function Provider({ children }) {

    const [state, dispatch] = useReducer(reducer, InitState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider;