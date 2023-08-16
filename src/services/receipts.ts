import { z } from 'zod';

const ReceiptDTO = z.object({
  receipt_id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  treatment: z.string(),
  price: z.string(),
});

const ReceiptFetch = z.object({
  id: z.string(),
  fields: z.object({
    ...ReceiptDTO.shape,
    date: z.string(),
  }),
});

const ReceiptFetchArray = z.array(ReceiptFetch);

const ReceiptAirTableFormat = z.object({
  fields: z.object({
    ...ReceiptDTO.shape,
  }),
});

interface Receipt {
  receipt_id: string;
  name: string;
  email: string;
  treatment: string;
  price: string;
}

interface ReceiptToAirTable {
  fields: Receipt;
}

export const fetchReceipts = async () => {
  const response: Response = await fetch(`${process.env.AIRTABLE_BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return ReceiptFetchArray.parse(data.records);
  }

  throw new Error('Not working.');
};

export const sendReceipt = async (receipt: Receipt) => {
  const receiptToAirTable: ReceiptToAirTable = {
    fields: {
      name: receipt.name,
      receipt_id: receipt.receipt_id,
      treatment: receipt.treatment,
      email: receipt.email,
      price: receipt.price,
    },
  };

  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const sendResponse: Response = await fetch(`${process.env.AIRTABLE_BASE_URL}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(ReceiptAirTableFormat.parse(receiptToAirTable)),
  });

  if (sendResponse.ok) {
    console.log('Data send successful !');
  } else {
    throw new Error('Sending failed.');
  }

  return null;
};

export const updateRecord = async (recordId: string, receipt: Receipt) => {
  const formatedData = {
    fields: {
      name: receipt.name,
      receipt_id: receipt.receipt_id,
      treatment: receipt.treatment,
      email: receipt.email,
      price: receipt.price,
    },
  };

  try {
    const url = `${process.env.AIRTABLE_BASE_URL}/${recordId}`;
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(ReceiptAirTableFormat.parse(formatedData)),
    });

    if (response.status === 200) {
      console.log('Record updated successfully.');
    } else {
      console.log('Error updating record.');
    }
  } catch (error) {
    console.error('An error occurred while updating the record:', error);
  }
};

export const deleteReceipt = async (recordId: string) => {
  try {
    const url = `${process.env.AIRTABLE_BASE_URL}/${recordId}`;
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    };
    const response = await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });
    if (response.status === 200) {
      console.log('Record deleted successfully.');
    } else {
      console.log('Error deleting record.');
    }
  } catch (error) {
    console.error('An error occurred while deleting the record:', error);
  }
};
