import React from 'react';

import { ReceiptForm } from './ReceiptForm';

const ReceiptPage = () => {
    return (
        <div className="flex flex-col items-center text-white">
            <h2 className="text-xl color-black font-bold mb-4 text-center text-white">
                Receipt Page
            </h2>
            <ReceiptForm />
        </div>
    );
};

export default ReceiptPage;
