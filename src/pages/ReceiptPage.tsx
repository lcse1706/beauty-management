import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../components/Auth/AuthContext';
import { ReceiptForm } from '../components/ReceiptForm';
import './ReceiptPage.scss';

export const ReceiptPage = () => {
  const { isLogged } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
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
