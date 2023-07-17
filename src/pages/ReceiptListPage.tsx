import { useNavigate } from 'react-router';
import { useAuthContext } from '../components/Auth/AuthContext';
import { ReceiptList } from '../components/ReceiptList';
import { useEffect } from 'react';

const ReceiptListPage = () => {
  const { isLogged } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/');
    }
  }, []);
  return <ReceiptList />;
};

export default ReceiptListPage;
