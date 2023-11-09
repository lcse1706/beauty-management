'use client';

import Image from 'next/image';

import { Receipt } from '@/lib';

import logo from './diamentnobg.png';

// This component is adjusted to handy printer which can print receipt from App with build-in browser.

const PrintPage = () => {
    let storedData: string | undefined;

    if (typeof window !== 'undefined') {
        storedData = localStorage.getItem('printData') ?? '{}';
    }

    const data: Receipt = JSON.parse(storedData ?? '{}');

    const currentDate =
        new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear();

    return (
        <html className="bg-white text-black text-2xl" lang="en">
            <body>
                <div className="container print:w-[4cm] print:h-[10cm] print:p-4">
                    <div>
                        <p className="mb-5">{currentDate}</p>
                        <p className="text-lg font-bold">
                            <Image
                                src={logo}
                                alt="Logo Beauty by EC"
                                blurDataURL="blur"
                                width={70}
                                className="inline mr-3 text-black"
                            />{' '}
                            Beauty By Ec
                        </p>
                        <p>Centrumvägen 17, 619 71 Vagnhärad</p>
                        <p className="mb-1">SE901115750101</p>
                    </div>

                    <div>
                        <p className="mb-1">
                            <span className="font-bold">Kvittens Nummer: </span>
                            {data.receipt_id}
                        </p>
                        <p className="mb-1 font-bold">Namn:</p>
                        <p className="mb-2">{data.name}</p>
                        <p className="mb-1 font-bold">Behandling:</p>
                        <p className="mb-2">{data.treatment}</p>
                        <p className="mb-1">
                            <span className="font-bold">Pris: </span>
                            {data.price} kr
                        </p>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default PrintPage;
