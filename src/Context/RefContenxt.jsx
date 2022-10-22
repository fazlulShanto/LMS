/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';

const RefContext = createContext({});

export function AuthProvider({ children }) {
    const [curRef, setCurRef] = useState('');
    const [locRef, setLocRef] = useState('');

    return (
        <RefContext.Provider
            value={{
                curRef,
                setCurRef,
                locRef,
                setLocRef,
            }}
        >
            {children}
        </RefContext.Provider>
    );
}

export default RefContext;
