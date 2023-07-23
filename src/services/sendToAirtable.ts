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
