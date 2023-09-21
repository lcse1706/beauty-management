import React from 'react';
import { ReceiptForm } from './ReceiptForm';
import styles from './ReceiptPage.module.css';

const ReceiptPage = () => {
  return (
    <div className={styles.receiptWrapper}>
      <h2 className="text-xl color-black font-bold mb-4 text-center text-white">Receipt Page</h2>
      <ReceiptForm />
    </div>
  );
};

export default ReceiptPage;
