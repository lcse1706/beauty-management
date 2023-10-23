'use client';

import { PrintReceipt } from '@/lib';

const PrintPage = () => {
    let storedData: string | undefined;

    if (typeof window !== 'undefined') {
        storedData = localStorage.getItem('pdfData') ?? '{}';
    }

    const data: PrintReceipt = JSON.parse(storedData ?? '{}');

    return (
        <html className="bg-white text-black text-2xl" lang="en">
            <body className="">
                <div className="container print:w-[4cm] print:h-[10cm] print:p-4">
                    <p className="text-lg font-bold">Customer Receipt</p>
                    <p className="mb-1 font-bold">Receipt number:</p>
                    <p className="mb-2">{data.receipt_id}</p>
                    <p className="mb-1 font-bold">Name:</p>
                    <p className="mb-2">{data.name}</p>
                    <p className="mb-1 font-bold">Email:</p>
                    <p className="mb-2">{data.email}</p>
                    <p className="mb-1 font-bold">Treatment:</p>
                    <p className="mb-2">{data.treatment}</p>
                    <p className="mb-1 font-bold">Price:</p>
                    <p className="mb-2">{data.price}</p>
                </div>
            </body>
        </html>
    );
};

export default PrintPage;
