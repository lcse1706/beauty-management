import { FormEventHandler, useRef, useState, useEffect } from 'react';
import Input from './Input';
import './LoginForm.scss';
import Button from './Button';
// import { clearInput } from './clearIInput';

interface Users {
  login: string;
  password: string;
}

const accounts: Users[] = [
  {
    login: 'Ewa',
    password: 'Ewa',
  },
  {
    login: 'Lukasz',
    password: 'Lukasz',
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

  const clearInputs = () => {
    if (loginRef.current) {
      loginRef.current.value = '';
    }
    if (passRef.current) {
      passRef.current.value = '';
    }
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
      // if (username === accounts[0].login && password === accounts[0].password) {
      console.log('poszlo');
      props.loginHandler(true);
    } else {
      clearInputs();

      setUsername('');
      setPassword('');

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
