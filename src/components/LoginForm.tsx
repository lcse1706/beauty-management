import { FormEventHandler, useRef, useState, useEffect } from 'react';
import Input from './Input';
import './LoginForm.scss';

interface Users {
  login: string;
  password: string;
}

const accounts: Users[] = [
  {
    login: 'Ewa',
    password: 'Ewa',
  },
];

const LoginForm = (props: { loginHandler: (Auth: boolean) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //domyslnie do czego ref bedzie przypisanny
  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  // Okreslamy na jakim elemencie dziala funkcja

  //TODO: otypowac onchange funkcje
  //TODO: dowiedziec sie jak obejsc loginRef.current
  const usernameHandler = () => {
    if (loginRef.current) {
      setUsername(loginRef.current.value);
    }
  };

  const passwordHandler = () => {
    if (passRef.current) {
      setPassword(passRef.current.value);
    }
  };

  const loginHandler: FormEventHandler<HTMLFormElement> = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === accounts[0].login && password === accounts[0].password) {
      props.loginHandler(true);
    } else {
      if (loginRef.current) {
        loginRef.current.value = '';
      }

      if (passRef.current) {
        passRef.current.value = '';
      }

      setUsername('');
      setPassword('');

      setError('Incorrect login or password !');
      props.loginHandler(false);
    }
  };

  // props.loginHandler(true);

  return (
    <div className="loginWrapper">
      <form className="loginForm" onSubmit={loginHandler}>
        <Input ref={loginRef} label="Login" type="text" onChange={usernameHandler} />
        <Input ref={passRef} label="Password" type="password" onChange={passwordHandler} />
        <div style={{ color: 'red' }}>{error && `${error}`}</div>
        <button className="button is-rounded" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
