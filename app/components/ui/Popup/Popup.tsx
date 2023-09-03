'use client';

import React, { useEffect } from 'react';
import './Popup.css';

export const Popup = ({ useContext }: any) => {
  const { showPopup, setShowPopup, message } = useContext();

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
