'use client';

import { createContext, useContext, useState } from 'react';

import { ReceiptsFromAirTable } from '@/lib';

interface DataContextType {
    receipts: ReceiptsFromAirTable[];
    setReceipts: React.Dispatch<React.SetStateAction<ReceiptsFromAirTable[]>>;
    receiptId: string;
    setReceiptId: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('Component should be placed in DataProvider !');
    }
    return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [receipts, setReceipts] = useState<ReceiptsFromAirTable[]>([]);
    const [receiptId, setReceiptId] = useState<string>('');
    const [loading, setLoading] = useState(false);

    return (
        <DataContext.Provider
            value={{
                receipts,
                setReceipts,
                receiptId,
                setReceiptId,
                loading,
                setLoading,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
