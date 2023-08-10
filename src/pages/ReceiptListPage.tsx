import { useNavigate } from 'react-router';
import { useAuthContext } from '../components/context/AuthContext';
import { ReceiptList } from '../components/forms/ReceiptList';
import { useEffect } from 'react';

export const ReceiptListPage = () => {
  const { isLogged } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
  }, []);
  return (
    <div>
      <h2 className="text-xl color-black font-bold mb-4 text-center text-white">Receipts</h2>
      <ReceiptList />
    </div>
  );
};
