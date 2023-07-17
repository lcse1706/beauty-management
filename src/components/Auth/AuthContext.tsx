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
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    if (sessionStorage.getItem('isAuth') === 'true') {
      return true;
    } else return false;
  });

  useEffect(() => {
    const auth = sessionStorage.getItem('isAuth');
    if (auth === 'true') {
      setIsLogged(true);
    }
  }, []);

  return <AuthContext.Provider value={{ isLogged, setIsLogged }}>{children}</AuthContext.Provider>;
};
