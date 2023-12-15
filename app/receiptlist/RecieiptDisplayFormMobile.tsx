import React from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { useDataContext } from '@/context';
import { ReceiptDisplayF } from '@/lib/types';

export const ReceiptDisplayFormMobile = ({ data }: ReceiptDisplayF) => {
    const router = useRouter();
    const { setReceiptId } = useDataContext();

    const goToDetails = () => {
        setReceiptId(data.id);
        router.push(`/receiptlist/${data.id}`);
    };

    return (
        <li className="flex flex-col items-center justify-center border-b-2 w-11/12 bg-white rounded-lg shadow-md border border-gray-200">
            <p className=" text-gray-600">{data.fields.receipt_id}</p>
            <p className=" text-gray-800 font-medium">{data.fields.name}</p>
            <p className="w-1/4 text-gray-600">{data.fields.email}</p>
            {/* <p className="w-1/4 text-gray-600">{data.fields.treatment}</p> */}
            {/* <p className="w-1/4 text-gray-800 font-bold"> */}
            {/* {data.fields.price} kr */}
            {/* </p> */}
            {/* <p className="w-1/4 text-gray-600">{data.fields.date}</p> */}
            <Button
                label="details"
                onClick={goToDetails}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            />
        </li>
    );
};
