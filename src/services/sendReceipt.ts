import { sendToAirtable } from './sendToAirtable';
import { z } from 'zod';

interface Receipt {
  receipt_id: string;
  name: string;
  email: string;
  treatment: string;
  price: string;
}

const Receipt1 = z.object({
  receipt_id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  treatment: z.string(),
  price: z.string(),
});

export const sendReceipt = (data: Receipt) => {
  const airtableFormatedData = {
    fields: {
      ...Receipt1.parse(data),
    },
  };

  sendToAirtable(airtableFormatedData);

  return null;
};
