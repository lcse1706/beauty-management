import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../components/context/AuthContext';
import { ReceiptForm } from '../components/forms/ReceiptForm';
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
      <h2 className="text-xl color-black font-bold mb-4 text-center text-white">Receipt Page</h2>
      <ReceiptForm />
    </div>
  );
};
