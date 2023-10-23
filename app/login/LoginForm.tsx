'use client';

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { NextPage } from 'next';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@/components/ui/';
import { useAuthContext } from '@/context/';
import { loginSchema, TloginSchema } from '@/lib/types';

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

export const LoginForm: NextPage = () => {
    const { setIsLogged } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<TloginSchema>({
        resolver: zodResolver(loginSchema),
    });

    //Moved from page.tsx to hide useEffect in client component

    useEffect(() => {
        const isAuth = sessionStorage.getItem('isAuth');
        if (isAuth === 'true') {
            router.push('/sendreceipt');
        }
    }, []);

    /////////////////////////////////////////////////////////////

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

    const formHandler = (data: TloginSchema) => {
        if (checkLogin(data.login, data.password)) {
            setIsLogged(true);
            router.push('/sendreceipt');
        } else {
            reset();
            setErrorMessage('Incorrect login or password !');
            setIsLogged(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-3">
            <form className="text-center" onSubmit={handleSubmit(formHandler)}>
                <Input label="Login" type="text" register={register('login')} />
                <Input
                    label="Password"
                    type="password"
                    register={register('password')}
                />
                {errorMessage && (
                    <div style={{ color: 'red' }}>{errorMessage}</div>
                )}

                <Button label="Log In" type="submit" />
            </form>
        </div>
    );
};
