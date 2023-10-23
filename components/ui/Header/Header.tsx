import type { ComponentProps } from 'react';

import Image from 'next/image';

import logo from './logo.png';

export const Header = ({ children }: ComponentProps<'header'>) => {
    return (
        <header className="flex flex-row h-[60px] w-screen justify-around items-center border-b border-white bg-[#151f29]">
            <h1 className="text-white font-medium">
                <Image
                    src={logo}
                    alt="Logo Beauty by EC"
                    placeholder="blur"
                    width={70}
                    className="inline mr-3"
                />
                Beauty Management
            </h1>
            {children}
        </header>
    );
};
