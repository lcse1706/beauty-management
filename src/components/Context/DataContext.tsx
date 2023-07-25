import { createContext, useContext, useEffect, useState } from 'react';

interface Receipt {
  id: string;
  fields: {
    receipt_id: string;
    name: string;
    email: string;
    threatment: string;
    price: number;
    date: string;
  };
}

interface DataContextType {
  receipts: Receipt[];
  setReceipts: React.Dispatch<React.SetStateAction<Receipt[]>>;
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
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [receiptId, setReceiptId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  return (
    <DataContext.Provider value={{ receipts, setReceipts, receiptId, setReceiptId, loading, setLoading }}>
      {children}
    </DataContext.Provider>
  );
};
