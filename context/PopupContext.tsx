'use client';

import { createContext, useContext, useState } from 'react';

interface PopupContextType {
    popup: boolean;
    // setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    showPopup: () => void;
    hidePopup: () => void;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const PopupContext = createContext<PopupContextType | null>(null);

export const usePopupContext = () => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error('Component should be placed in PopupProvider !!!');
    }
    return context;
};

export const PopupProvider = ({
    children,
    storybookValues,
}: {
    children: React.ReactNode;
    storybookValues?: PopupContextType;
}) => {
    const usePopup = () => {
        const [popup, setPopup] = useState<boolean>(false);
        const [message, setMessage] = useState<string>('');

        const showPopup = () => setPopup(true);
        const hidePopup = () => setPopup(false);

        return { popup, setPopup, message, setMessage, showPopup, hidePopup };
    };

    const callUsePopup = usePopup();

    return (
        <PopupContext.Provider
            value={storybookValues ? storybookValues : callUsePopup}
        >
            {children}
        </PopupContext.Provider>
    );
};
