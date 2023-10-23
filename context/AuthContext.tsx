'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Component should be placed in AuthProvider !');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};
