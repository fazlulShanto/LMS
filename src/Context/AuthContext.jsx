/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [userUuid, setUserUuid] = useState('000000');
    const [userName, setUserName] = useState('Default');
    const [userRole, setUserRole] = useState(JSON.stringify({}));
    const [loggedIn, setLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(false);

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
                accessToken,
                setAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
