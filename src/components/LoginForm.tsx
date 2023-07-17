import { FormEventHandler, useContext, useRef, useState } from 'react';
import Input from '../UI/Input';
import './LoginForm.scss';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from './Auth/AuthContext';

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

const LoginForm = () => {
  const { setIsLoggedIn } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

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
      localStorage.setItem('isAuth', 'true');
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
      setIsLoggedIn(true);
      navigate('/sendreceipt');
    } else {
      clearInputs();
      setErrorMessage('Incorrect login or password !');
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="loginWrapper">
      <form className="loginForm " onSubmit={formHandler}>
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
