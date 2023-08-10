import React, { useState, useEffect } from 'react';
import './Popup.scss';
import { usePopupContext } from '../components/context/PopupContext';

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
      <div className="modal-content">
        <h2>{message}</h2>
      </div>
    </div>
  );
};
