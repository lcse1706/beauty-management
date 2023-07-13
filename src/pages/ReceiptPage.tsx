import MainHeader from '../components/layout/MainHeader';
import ReceiptForm from '../components/ReceiptForm';
import './ReceiptPage.scss';

const ReceiptPage = () => {
  return (
    <div className="receiptWrapper">
      {/* <MainHeader /> */}
      <h1>Receipt Page</h1>
      <ReceiptForm />
    </div>
  );
};

export default ReceiptPage;
