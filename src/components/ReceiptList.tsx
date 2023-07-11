import { useEffect, useState } from 'react';
import ReceiptDetails from './ReceiptDetails';

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

const ReceiptList = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_AIRTABLE_API_TOKEN);
    fetch('https://api.airtable.com/v0/appzpLACufTjr6Q8g/receipts', {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log('data: ', data.records);
        setReceipts(data.records);
      });
  }, []);

  return (
    <div>
      <h2>Receipts</h2>
      {receipts.map((receipt) => (
        <ReceiptDetails key={receipt.id} data={receipt.fields} />
      ))}
    </div>
  );
};

export default ReceiptList;
