import { FieldValues } from 'react-hook-form';

import { Receipt, ReceiptsFromAirTable } from '@/lib';

import { sortReceipts } from './sortReceipts';

export const setReceiptNumber = (
    data: FieldValues,
    receipts: ReceiptsFromAirTable[],
) => {
    let receipt: Receipt;

    if (receipts.length !== 0) {
        const sortedReceipts = sortReceipts(receipts);
        let getLastNumber =
            sortedReceipts[sortedReceipts.length - 1].fields.receipt_id.split(
                '/',
            )[0];
        const getMonthNumber =
            sortedReceipts[sortedReceipts.length - 1].fields.receipt_id.split(
                '/',
            )[1];

        if (+getMonthNumber !== new Date().getMonth() + 1) {
            getLastNumber = '0';
        }

        receipt = {
            receipt_id:
                +getLastNumber +
                1 +
                '/' +
                (new Date().getMonth() + 1) +
                '/' +
                new Date().getFullYear(),
            name: data.name,
            email: data.email,
            treatment: data.treatment,
            price: data.price,
        };
    } else {
        receipt = {
            receipt_id:
                '1/' +
                (new Date().getMonth() + 1) +
                '/' +
                new Date().getFullYear(),
            name: data.name,
            email: data.email,
            treatment: data.treatment,
            price: data.price,
        };
    }

    return receipt;
};
