import { FormEventHandler, useRef, useState, useEffect, ChangeEvent } from 'react';
import Input from './Input';
import './LoginForm.scss';
import Button from './Button';

interface Users {
  id: number;
  login: string;
  password: string;
}

const accounts: Users[] = [
  {
    id: 1,
    login: 'Ewa',
    password: 'Ewa',
  },
  {
    id: 2,
    login: 'Lukasz',
    password: 'Lukasz',
  },
];

const LoginForm = (props: { loginHandler: (Auth: boolean) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  //TODO Czy w tym wypadku typujemy funkcje ?
  const usernameHandler = () => {
    const username = loginRef.current?.value ?? '';
    setUsername(username);
  };

  const passwordHandler = () => {
    const password = passRef.current?.value ?? '';
    setPassword(password);
  };

  const clearInputs = () => {
    if (loginRef.current && passRef.current) {
      loginRef.current.value = '';
      passRef.current.value = '';
    }
    setUsername('');
    setPassword('');
  };

  let isUser: boolean = false;
  const checkLogin = (username: string, password: string): any => {
    accounts.map((user) => {
      if (user.login === username && user.password === password) {
        return (isUser = true);
      }
    });
  };

  const loginHandler: FormEventHandler<HTMLFormElement> = (event: React.FormEvent) => {
    event.preventDefault();
    checkLogin(username, password);
    if (isUser) {
      props.loginHandler(true);
    } else {
      clearInputs();
      setError('Incorrect login or password !');
      props.loginHandler(false);
    }
  };

  return (
    <div className="loginWrapper">
      <form className="loginForm" onSubmit={loginHandler}>
        <Input ref={loginRef} label="Login" type="text" onChange={usernameHandler} />
        <Input ref={passRef} label="Password" type="password" onChange={passwordHandler} />
        <div style={{ color: 'red' }}>{error && `${error}`}</div>
        <Button className="button is-rounded" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
