import LoginForm from '../components/LoginForm';

const LoginPage = (props: { loginHandler: (Auth: boolean) => void }) => {
  const loginHandler = (Auth: boolean) => {
    props.loginHandler(Auth);
  };

  return <LoginForm loginHandler={loginHandler} />;
};

export default LoginPage;
