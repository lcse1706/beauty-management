import LoginForm from '../components/LoginForm';

const LoginPage = (props: { loginHandler: (Auth: boolean) => void }) => {
  const loginHandler = (auth: boolean) => {
    props.loginHandler(auth);
  };

  return <LoginForm loginHandler={loginHandler} />;
};

export default LoginPage;
