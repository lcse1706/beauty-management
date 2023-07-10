import { useEffect, useState } from 'react';

const REACT_APP_AIRTABLE_API_TOKEN =
  'patBhitxBEpQ1E3rr.90189257c2089de66336a85eeb9f6c1d65a7f4889966fa715071f6871ff0e702';
const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_AIRTABLE_API_TOKEN);
    fetch('https://api.airtable.com/v0/appzpLACufTjr6Q8g/receipts', {
      headers: {
        Authorization: `Bearer ${REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log('data: ', data);
        setReceipts(data);
      });
  }, []);

  return (
    <div>
      <h2>Receipts</h2>
    </div>
  );
};

export default ReceiptList;
