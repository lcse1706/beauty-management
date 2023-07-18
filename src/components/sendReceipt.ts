import { sendToAirtable } from '../services/receipts';

export const sendReceipt = (data: object) => {
  const airtableFormatedData = {
    fields: {
      ...data,
    },
  };

  sendToAirtable(airtableFormatedData);

  return null;
};
