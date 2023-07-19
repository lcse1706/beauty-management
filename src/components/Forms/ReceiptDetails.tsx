export const ReceiptDetails = ({ data }: any) => {
  const receipt = data[0].fields;
  return (
    <div>
      {receipt && (
        <div>
          <p>Receipt number: {receipt.receipt_id}</p>
          <p>Name: {receipt.name}</p>
          <p>Email: {receipt.email}</p>
          <p>Treatment: {receipt.treatment}</p>
          <p>Price: {receipt.price}</p>
        </div>
      )}
    </div>
  );
};
