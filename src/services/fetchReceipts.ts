import { z } from 'zod';

const ReceiptZOD = z.object({
  id: z.string(),
  fields: z.object({
    receipt_id: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    treatment: z.string(),
    price: z.string(),
    date: z.string(),
  }),
});

export const fetchReceipts = async () => {
  const response: Response = await fetch('https://api.airtable.com/v0/appzpLACufTjr6Q8g/receipts', {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return ReceiptZOD.parse(data.records);
  }

  throw new Error('Not working.');
};
