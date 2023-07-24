interface editedData {
  fields: {
    receipt_id: string;
    name: string;
    email: string;
    treatment: string;
    price: string;
  };
}
export const updateRecord = async (recordId: string, data: editedData) => {
  try {
    const url = `https://api.airtable.com/v0/appzpLACufTjr6Q8g/receipts/${recordId}`;
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      'Content-Type': 'application/json',
    };
    const response = await fetch(url, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(data),
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