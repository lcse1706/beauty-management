import React, { useState, useEffect } from 'react';
import './Modal.scss'; // Import the CSS file for the modal styles

export const Modal = ({ showModal, setShowModal, modalContent }: any) => {
  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
      }, 3000); // Hide the modal after 3000 milliseconds (3 seconds)
    }
  }, [showModal, setShowModal]);

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <h2>{modalContent}</h2>
        {/* Add your modal content here */}
      </div>
    </div>
  );
};
