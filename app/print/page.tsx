'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { Receipt } from '@/lib';

import logo from './diamentnobg.png';

// This component is adjusted to handy printer which can print receipt from App with build-in browser.

const PrintPage = () => {
    const router = useRouter();
    let storedData: string | undefined;

    if (typeof window !== 'undefined') {
        storedData = localStorage.getItem('printData') ?? '{}';
    }

    const data: Receipt = JSON.parse(storedData ?? '{}');

    const backHandler = () => {
        router.back();
    };
    const printHandler = () => {
        window.print();
    };

    const currentDate =
        new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear();

    return (
        <div>
            <div className="max-w-md mx-auto bg-white p-8 border border-gray-600 text-black mb-3">
                <p className="text-lg font-bold mb-3">
                    <Image
                        src={logo}
                        alt="Logo Beauty by EC"
                        blurDataURL="blur"
                        width={70}
                        className="inline mr-3 text-black"
                    />
                    Beauty By Ec
                </p>
                <p>Gnestavägen 2c, 619 71 Vagnhärad</p>
                <p>SE901115750101</p>
                <hr className="my-5 border-t border-gray-600" />

                <p className="mb-1">
                    <span className="font-bold">Date: </span> {currentDate}
                </p>
                <p className="mb-1">
                    <span className="font-bold">Receipt Number: </span>
                    {data.receipt_id}
                </p>
                <p className="mb-1">
                    <span className="font-bold">Name: </span>
                    {data.name}
                </p>
                <p className="mb-1">
                    <span className="font-bold">Treatment: </span>
                    {data.treatment}
                </p>
                <p className="mb-3">
                    <span className="font-bold">Price: </span>
                    {data.price} SEK
                </p>
            </div>
            <Button label="<<<" onClick={backHandler} />
            <Button
                label="Print"
                className="bg-green-600 hover:bg-green-700"
                onClick={printHandler}
            />
        </div>
    );
};

export default PrintPage;
