import { createContext } from 'react';

interface Context {
  isLoggedin: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextApi = createContext<Context>({} as Context);
