import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isLoggedin: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [isLoggedin, setIsLoggedIn] = useState<boolean>(false);
  return <AuthContext.Provider value={{ isLoggedin, setIsLoggedIn }}>{children}</AuthContext.Provider>;
};
