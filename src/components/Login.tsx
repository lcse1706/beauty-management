import { FormEventHandler, useRef } from 'react';
import Input from './Input';
import './Login.scss';

const Login = (props: { loginHandler: any }) => {
  //domyslnie do czego ref bedzie przypisanny
  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  // Okreslamy na jakim elemencie dziala funkcja
  const loginHandler: FormEventHandler<HTMLButtonElement> = () => {
    props.loginHandler(true);
  };

  return (
    <form className="loginForm">
      <Input ref={loginRef} label="Login" type="text" />
      <Input ref={passRef} label="Password" type="password" />
      <button className="button is-rounded" type="submit" onClick={loginHandler}>
        Login
      </button>
    </form>
  );
};

export default Login;
