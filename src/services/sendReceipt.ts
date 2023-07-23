import { sendToAirtable } from './sendToAirtable';

export const sendReceipt = (data: object) => {
  const airtableFormatedData = {
    fields: {
      ...data,
    },
  };

  sendToAirtable(airtableFormatedData);

  return null;
};
