export const fetchReceipts = async () => {
  const response: Response = await fetch('https://api.airtable.com/v0/appzpLACufTjr6Q8g/receipts', {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.records;
  }

  throw new Error('Not working.');
};

export const sendToAirtable = async (data: any) => {
  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const sendResponse: Response = await fetch('https://api.airtable.com/v0/appzpLACufTjr6Q8g/receipts', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  });

  if (sendResponse.ok) {
    console.log('Data send successful !');
  } else {
    throw new Error('Sending failed.');
  }
};

export const deleteReceipt = async (recordId: string) => {
  try {
    const url = `https://api.airtable.com/v0/appzpLACufTjr6Q8g/receipts/${recordId}`;
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
