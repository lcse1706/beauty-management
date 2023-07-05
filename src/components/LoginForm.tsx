import { FormEventHandler, useRef, useState } from 'react';
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
  {
    id: 3,
    login: '1',
    password: '1',
  },
];

const LoginForm = (props: { loginHandler: (auth: boolean) => void }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

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

  const checkLogin = (username: string, password: string): boolean => {
    const isLoggedIn = accounts.some((user) => {
      return user.login === username && user.password === password;
    });

    if (isLoggedIn) {
      return true;
    } else {
      return false;
    }
  };

  const loginHandler: FormEventHandler<HTMLFormElement> = (event: React.FormEvent) => {
    event.preventDefault();
    if (checkLogin(username, password)) {
      props.loginHandler(true);
    } else {
      clearInputs();
      setErrorMessage('Incorrect login or password !');
      props.loginHandler(false);
    }
  };

  return (
    <div className="loginWrapper">
      <form className="loginForm" onSubmit={loginHandler}>
        <Input ref={loginRef} label="Login" type="text" onChange={usernameHandler} />
        <Input ref={passRef} label="Password" type="password" onChange={passwordHandler} />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        <Button className="button is-rounded" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
