import { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import { ContextApi } from '../components/Context/ContextApi';

// type Props = {
//   loginHandler: (auth: boolean) => void;
// };

// const LoginPage = ({ loginHandler }: Props) => {
//   const formloginHandler = (auth: boolean) => {
//     loginHandler(auth);
//   };

// return <LoginForm loginHandler={formloginHandler} />;

const LoginPage = () => {
  const { isLoggedin, setIsLoggedIn } = useContext(ContextApi);

  return <div>{!isLoggedin && <LoginForm />} </div>;
};

export default LoginPage;
