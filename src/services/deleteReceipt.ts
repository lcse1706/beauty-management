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
