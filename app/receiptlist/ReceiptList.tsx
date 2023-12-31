'use client';

import React from 'react';
import { useEffect } from 'react';

import { revalidatePath, revalidateTag } from 'next/cache';
import { useRouter } from 'next/navigation';

import { Loader } from '@/components/ui';
import { sortReceipts } from '@/components/utils/sortReceipts';
import { useAuthContext, useDataContext, usePopupContext } from '@/context';
import { useApi } from '@/hooks/useApi';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ReceiptsFromAirTable } from '@/lib';
import { fetchReceipts } from '@/services/receipts';

import { ReceiptDisplayForm } from './ReceiptDisplayForm';
import './ReceiptList.css';
import { ReceiptDisplayFormMobile } from './RecieiptDisplayFormMobile';

export const ReceiptList = () => {
    const { receipts, setReceipts, loading, setLoading } = useDataContext();
    const { setShowPopup, setMessage } = usePopupContext();
    const { data, isLoading, isError } = useApi<ReceiptsFromAirTable[]>('');

    const breakpoint768 = useMediaQuery(768);

    //Moved from page.tsx to hide useEffect in client component

    const { isLogged } = useAuthContext();
    const router = useRouter();
    // revalidateTag('/receiptlist');

    useEffect(() => {
        if (!isLogged) {
            router.push('/');
        }

        setLoading(isLoading);

        const fetchData = async () => {
            const fetchedData = await fetchReceipts();
            if (Array.isArray(fetchedData)) {
                setReceipts(fetchedData);
            }

            if (isError) {
                setReceipts([]);
                setShowPopup(true);
                setMessage('Data fetch failed!');
            }
        };

        fetchData();
    }, [data, isLoading, isError]);

    const sortedReceipts = sortReceipts(receipts);

    return (
        <ul className="flex flex-col items-center overflow-scroll mt-2 max-h-[70dvh] receiptList space-y-4 p-4 bg-gray-100 rounded-lg">
            {isLoading ? (
                <Loader />
            ) : (
                sortedReceipts.map((receipt) =>
                    breakpoint768 ? (
                        <ReceiptDisplayFormMobile
                            key={receipt.id}
                            data={receipt}
                        />
                    ) : (
                        <ReceiptDisplayForm key={receipt.id} data={receipt} />
                    ),
                )
            )}
        </ul>
    );
};
