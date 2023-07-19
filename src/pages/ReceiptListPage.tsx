import { useNavigate } from 'react-router';
import { useAuthContext } from '../components/Context/AuthContext';
import { ReceiptList } from '../components/Forms/ReceiptList';
import { useEffect } from 'react';

export const ReceiptListPage = () => {
  const { isLogged } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
  }, []);
  return <ReceiptList />;
};
