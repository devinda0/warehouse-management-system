import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState(null);
    const [role, setRole] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        if(!accessToken) return;

        const decoded = jwtDecode(accessToken);
        setRole(decoded.role);
        setUsername(decoded.username);
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, role, setRole, username, setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;