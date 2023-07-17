import LoginForm from '../components/LoginForm';
import { useAuthContext } from '../components/Auth/AuthContext';

const LoginPage = () => {
  const { isLoggedin } = useAuthContext();

  return <div>{!isLoggedin && <LoginForm />} </div>;
};

export default LoginPage;
