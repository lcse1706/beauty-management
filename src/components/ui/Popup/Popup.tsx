'use client';

import React, { useState, useEffect } from 'react';
import './Popup.css';
import { usePopupContext } from '../../../context/PopupContext';

export const Popup = () => {
  const { showPopup, setShowPopup, message } = usePopupContext();

  useEffect(() => {
    if (showPopup) {
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  }, [showPopup, setShowPopup]);

  return (
    <div className={`modal ${showPopup ? 'show' : ''}`}>
      <div className="popup">
        <h2>{message}</h2>
      </div>
    </div>
  );
};
