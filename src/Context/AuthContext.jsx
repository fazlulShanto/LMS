/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [userUuid, setUserUuid] = useState('000000');
    const [userName, setUserName] = useState('User');
    const [userRole, setUserRole] = useState('No ROle');
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider
            value={{
                userUuid,
                setUserUuid,
                userName,
                setUserName,
                userRole,
                setUserRole,
                loggedIn,
                setLoggedIn,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
