export const fetchReceipts = async () => {
  const response: Response = await fetch('https://api.airtable.com/v0/appzpLACufTjr6Q8g/receipts', {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    },
    //POST
    // headers: {
    //   'Content-type': 'application/json'
    // },
    // body: JSON.stringify(data)
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
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
