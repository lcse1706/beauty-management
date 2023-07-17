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
    return data.records;
  }

  throw new Error('Not working.');
};
