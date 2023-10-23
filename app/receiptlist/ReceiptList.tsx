'use client';

import React from 'react';
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Loader } from '@/components/ui';
import { sortReceipts } from '@/components/utils/sortReceipts';
import { useAuthContext, useDataContext, usePopupContext } from '@/context/';
import { fetchReceipts } from '@/services/receipts';

import { ReceiptDisplayForm } from './ReceiptDisplayForm';
import './ReceiptList.css';

export const ReceiptList = () => {
    const { receipts, setReceipts, loading, setLoading } = useDataContext();
    const { setShowPopup, setMessage } = usePopupContext();

    //Moved from page.tsx to hide useEffect in client component

    const { isLogged } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!isLogged) {
            router.push('/');
        }
        fetchData();
    }, []);

    /////////////////////////////////////////////////////////////

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await fetchReceipts();

            if (Array.isArray(data)) {
                setReceipts(data);
            }
        } catch (error) {
            setShowPopup(true);
            setMessage('Something went wrong !');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const sortedReceipts = sortReceipts(receipts);

    return (
        <ul className="flex flex-col items-center overflow-scroll mt-2 max-h-[70dvh] receiptList space-y-4 p-4 bg-gray-100 rounded-lg">
            {loading ? (
                <Loader />
            ) : (
                sortedReceipts.map((receipt) => (
                    <ReceiptDisplayForm key={receipt.id} data={receipt} />
                ))
            )}
        </ul>
    );
};
