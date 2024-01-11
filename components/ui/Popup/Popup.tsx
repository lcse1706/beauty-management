'use client';

import React, { useEffect } from 'react';

import { usePopupContext } from '@/context';

import './Popup.css';

export const Popup = () => {
    const { popup, hidePopup, message } = usePopupContext();

    useEffect(() => {
        if (popup) {
            setTimeout(() => {
                hidePopup();
            }, 3000);
        }
    }, [popup]);

    return (
        <div className={`modal ${popup ? 'show' : ''}`}>
            <div className="popup">
                <h2>{message}</h2>
            </div>
        </div>
    );
};
