import LoginForm from '../components/LoginForm';

type Props = {
  loginHandler: (auth: boolean) => void;
};

const LoginPage = ({ loginHandler }: Props) => {
  const formloginHandler = (auth: boolean) => {
    loginHandler(auth);
  };

  return <LoginForm loginHandler={formloginHandler} />;
};

export default LoginPage;
