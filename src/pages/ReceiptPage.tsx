import { useNavigate } from 'react-router';
import { useAuthContext } from '../components/Auth/AuthContext';
import ReceiptForm from '../components/ReceiptForm';
import './ReceiptPage.scss';
import { useEffect } from 'react';

const ReceiptPage = () => {
  const { isLoggedin } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/');
    }
  }, []);

  return (
    <div className="receiptWrapper">
      <h1>Receipt Page</h1>
      <ReceiptForm />
    </div>
  );
};

export default ReceiptPage;
