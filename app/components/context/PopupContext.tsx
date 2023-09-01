'use client';

import { createContext, useContext, useState } from 'react';

interface ModalContextType {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const PopupContext = createContext<ModalContextType | null>(null);

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('Component should be placed in AuthProvider !');
  }
  return context;
};

export const PopupProvider = ({ children }: { children: React.ReactNode }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  return (
    <PopupContext.Provider value={{ showPopup, setShowPopup, message, setMessage }}>{children}</PopupContext.Provider>
  );
};
