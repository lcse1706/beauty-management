'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isLogged: boolean;
    // setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    logIn: () => void;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Component should be placed in AuthProvider !');
    }
    return context;
};

// Logic close in hook separate from view, easy to test

const useAuth = () => {
    const initialState = () => {
        if (typeof window !== 'undefined') {
            return sessionStorage.getItem('isAuth') === 'true';
        }
        return false;
    };

    const [isLogged, setIsLogged] = useState<boolean>(initialState);

    useEffect(() => {
        const auth = sessionStorage.getItem('isAuth');
        if (auth === 'true') {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, []);

    const logIn = () => setIsLogged(true);
    const logOut = () => setIsLogged(false);

    return { isLogged, logIn, logOut };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthContext.Provider value={useAuth()}>
            {children}
        </AuthContext.Provider>
    );
};
