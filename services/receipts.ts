import axios from 'axios';

import { Receipt, ReceiptFetchArray, ReceiptToAirTable } from '@/lib';

const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}`,
};
const BASE_URL = process.env.NEXT_PUBLIC_AIRTABLE_BASE_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}`,
        'content-type': 'application/json',
    },
});

export const fetchReceipts = async () => {
    const response = await api.get('');
    return ReceiptFetchArray.parse(response.data.records);
};

export const sendReceipt = async (receipt: Receipt) => {
    const receiptToAirTable: ReceiptToAirTable = {
        fields: {
            name: receipt.name,
            receipt_id: receipt.receipt_id,
            treatment: receipt.treatment,
            email: receipt.email,
            price: receipt.price,
        },
    };
    try {
        await api.post('', receiptToAirTable);
        console.log('Data send successful !');
    } catch (error) {
        console.log('Sending failed: ', error);
    }
};

export const updateRecord = async (recordId: string, receipt: Receipt) => {
    const formattedData = {
        fields: {
            name: receipt.name,
            receipt_id: receipt.receipt_id,
            treatment: receipt.treatment,
            email: receipt.email,
            price: receipt.price,
        },
    };

    try {
        api.put(`/${recordId}`, formattedData);
        console.log('Record ' + recordId + ' updated !');
    } catch (error) {
        console.log('Record update failed: ', error);
    }
};

export const deleteReceipt = async (recordId: string) => {
    try {
        api.delete(`/${recordId}`);
        console.log('Record ' + recordId + ' deleted !');
    } catch (error) {
        console.error('An error occurred while deleting the record:', error);
    }
};
