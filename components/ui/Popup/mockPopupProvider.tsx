import React, { useState } from 'react';
interface PopupContextType {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const MockPopupContext = React.createContext<PopupContextType | null>(null);

type MockPopupProviderProps = {
  children: React.ReactNode;
  defaultShow?: boolean;
  defaultMessage?: string;
};

export const MockPopupProvider: React.FC<MockPopupProviderProps> = ({
  children,
  defaultShow = true,
  defaultMessage = 'Hello from Storybook',
}) => {
  const [showPopup, setShowPopup] = useState(defaultShow);
  const [message, setMessage] = useState(defaultMessage);

  return (
    <MockPopupContext.Provider value={{ showPopup, setShowPopup, message, setMessage }}>
      {children}
    </MockPopupContext.Provider>
  );
};
export const usePopupContext = () => {
  const context = React.useContext(MockPopupContext);
  if (!context) {
    throw new Error('Mock Provider ');
  }
  return context;
};
