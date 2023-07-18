import { createContext, useContext, useEffect, useState } from 'react';

interface Receipt {
  receipt_id: string;
  name: string;
  email: string;
  treatment: string;
  price: string;
}

interface DataContextType {
  receiptsList: Receipt[];
  setReceiptsList: React.Dispatch<React.SetStateAction<Receipt[]>>;
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
  const [receiptsList, setReceiptsList] = useState<Receipt[]>([]);

  return <DataContext.Provider value={{ receiptsList, setReceiptsList }}>{children}</DataContext.Provider>;
};
