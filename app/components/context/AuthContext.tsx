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
  // const [isLogged, setIsLogged] = useState<boolean>(() => {
  //   if (sessionStorage.getItem('isAuth') === 'true') {
  //     return true;
  //   } else return false;
  // });

  // useEffect(() => {
  //   const auth = sessionStorage.getItem('isAuth');
  //   if (auth === 'true') {
  //     setIsLogged(true);
  //   }
  // }, []);

  const initialState = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('isAuth') === 'true';
    }
    return false; // Default value for server-side rendering
  };

  const [isLogged, setIsLogged] = useState<boolean>(initialState);

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuth');
    if (auth === 'true') {
      setIsLogged(true);
    } else {
      setIsLogged(false); // Explicitly set to false if not true
    }
  }, []);

  return <AuthContext.Provider value={{ isLogged, setIsLogged }}>{children}</AuthContext.Provider>;
};
