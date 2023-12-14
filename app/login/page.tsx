import React from 'react';

import { LoginForm } from './LoginForm';

const LoginPage = () => {
    return (
        <div>
            <div className="mb-5">
                <h3>
                    <span className="font-semibold">Login:</span> App
                </h3>
                <h3>
                    <span className="font-semibold">Password:</span> App
                </h3>
            </div>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
