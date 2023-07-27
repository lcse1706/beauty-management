import { createContext, useContext, useEffect, useState } from 'react';

interface ModalContextType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Component should be placed in AuthProvider !');
  }
  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  return (
    <ModalContext.Provider value={{ showModal, setShowModal, message, setMessage }}>{children}</ModalContext.Provider>
  );
};
