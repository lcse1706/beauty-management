import React, { useState, useEffect } from 'react';
import './Modal.scss';
import { useModalContext } from '../components/Context/ModalContext';

export const Modal = () => {
  const { showModal, setShowModal, message } = useModalContext();

  useEffect(() => {
    if (showModal) {
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  }, [showModal, setShowModal]);

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <h2>{message}</h2>
      </div>
    </div>
  );
};
