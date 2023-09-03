'use client';

import { createContext, useContext, useState } from 'react';

interface PopupContextType {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const PopupContext = createContext<PopupContextType | null>(null);

export const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('Component should be placed in PopupProvider !');
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
