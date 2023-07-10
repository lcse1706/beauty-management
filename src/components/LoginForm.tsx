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

type Props = {
  loginHandler: (auth: boolean) => void;
};

const LoginForm = ({ loginHandler }: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const loginRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);

  const clearInputs = () => {
    if (loginRef.current && passRef.current) {
      loginRef.current.value = '';
      passRef.current.value = '';
    }
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

  const formHandler: FormEventHandler<HTMLFormElement> = (event: React.FormEvent) => {
    event.preventDefault();
    const username = loginRef.current?.value ?? '';
    const password = passRef.current?.value ?? '';
    if (checkLogin(username, password)) {
      loginHandler(true);
    } else {
      clearInputs();
      setErrorMessage('Incorrect login or password !');
      loginHandler(false);
    }
  };

  return (
    <div className="loginWrapper">
      <form className="loginForm" onSubmit={formHandler}>
        <Input ref={loginRef} label="Login" type="text" />
        <Input ref={passRef} label="Password" type="password" />
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

        <Button className="button is-rounded" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
