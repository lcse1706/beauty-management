import React from 'react';

import { ReceiptList } from './ReceiptList';

const ReceiptListPage = () => {
    return (
        <div>
            <h2 className="text-xl color-black font-bold mb-4 text-center text-white">
                Receipts
            </h2>
            <ReceiptList />
        </div>
    );
};

export default ReceiptListPage;
