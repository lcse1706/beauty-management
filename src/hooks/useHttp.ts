// import { useState } from 'react';

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

export const useHttp = async () => {
  let fetchedReceipts: Receipt[] = [];
  // const [receipts, setReceipts] = useState<Receipt[]>([]);

  await fetch('https://api.airtable.com/v0/appzpLACufTjr6Q8g/receipts', {
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
      fetchedReceipts = data.records;
    });

  console.log(fetchedReceipts);
  return fetchedReceipts;
};
