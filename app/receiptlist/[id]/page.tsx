'use client';

import React from 'react';

import { useDataContext } from '../../../context/DataContext';
import { ReceiptDetails } from './ReceiptDetails';

const DetailsPage = () => {
    const { receiptId, receipts } = useDataContext();

    const getData = () => {
        const data = receipts.filter((receipt) => receipt.id === receiptId);
        console.log(data);
        return data;
    };

    return (
        <div>
            <h2 className="text-xl color-black font-bold mb-4 text-center text-white">
                Receipt Details
            </h2>
            <ReceiptDetails data={getData()} />
        </div>
    );
};

export default DetailsPage;
