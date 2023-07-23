import { sendToAirtable } from './sendToAirtable';

interface Receipt {
  receipt_id: string;
  name: string;
  email: string;
  treatment: string;
  price: string;
}

export const sendReceipt = (data: Receipt) => {
  const airtableFormatedData = {
    fields: {
      ...data,
    },
  };

  sendToAirtable(airtableFormatedData);

  return null;
};
