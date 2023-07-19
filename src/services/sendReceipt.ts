import { sendToAirtable } from './receipts';

export const sendReceipt = (data: object) => {
  const airtableFormatedData = {
    fields: {
      ...data,
    },
  };

  sendToAirtable(airtableFormatedData);

  return null;
};
