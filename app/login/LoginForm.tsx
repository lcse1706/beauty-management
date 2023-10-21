'use client';

import React from 'react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, Input } from '@/components/ui/';
import { useAuthContext } from '@/context/';

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

export const LoginForm = () => {
    const { setIsLogged } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    //Moved from page.tsx to hide useEffect in client component

    useEffect(() => {
        const isAuth = sessionStorage.getItem('isAuth');
        if (isAuth === 'true') {
            router.push('/sendreceipt');
        }
    }, []);

    /////////////////////////////////////////////////////////////

    const loginRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const clearInputs = () => {
        if (loginRef.current && passRef.current) {
            loginRef.current.value = '';
            passRef.current.value = '';
        }
    };

    const checkLogin = (username: string, password: string): boolean => {
        const isLogged = accounts.some((user) => {
            return user.login === username && user.password === password;
        });

        if (isLogged) {
            sessionStorage.setItem('isAuth', 'true');
            return true;
        } else {
            return false;
        }
    };

    const formHandler: FormEventHandler<HTMLFormElement> = (
        event: React.FormEvent,
    ) => {
        event.preventDefault();
        const username = loginRef.current?.value ?? '';
        const password = passRef.current?.value ?? '';
        if (checkLogin(username, password)) {
            setIsLogged(true);
            router.push('/sendreceipt');
        } else {
            clearInputs();
            setErrorMessage('Incorrect login or password !');
            setIsLogged(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-3">
            <form className="text-center" onSubmit={formHandler}>
                <Input ref={loginRef} label="Login" type="text" />
                <Input ref={passRef} label="Password" type="password" />
                {errorMessage && (
                    <div style={{ color: 'red' }}>{errorMessage}</div>
                )}

                <Button label="Log In" type="submit" />
            </form>
        </div>
    );
};
