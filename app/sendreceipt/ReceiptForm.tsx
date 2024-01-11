'use client';

import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import { Button, Input, Loader, Select } from '@/components/ui';
import { setReceiptNumber } from '@/components/utils/setReceiptNumber';
import { useDataContext, usePopupContext } from '@/context';
import { treatments } from '@/lib/treatments';
import { fetchReceipts, sendReceipt } from '@/services';

export const ReceiptForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { receipts, setReceipts, loading, loadingOn, loadingOff } =
        useDataContext();
    const { showPopup, setMessage } = usePopupContext();

    // Refresh after back from /print path

    useEffect(() => {
        window.onpopstate = () => {
            window.location.reload();
        };
    }, []);

    // Fetching list to determinate next number

    const fetchData = async () => {
        try {
            const dataFromAirtable = await fetchReceipts();
            setReceipts(dataFromAirtable);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [setReceipts]);

    const submitHandler: SubmitHandler<FieldValues> = (data: FieldValues) => {
        setMessage('');

        const receipt = setReceiptNumber(data, receipts);

        const sendData = async () => {
            console.log(receipt);
            try {
                loadingOn();
                await sendReceipt(receipt);
                setMessage('Receipt successfully added !');
                fetchData();
            } catch (error) {
                console.error(error);
                setMessage('Something went wrong !');
            } finally {
                loadingOff();
                showPopup();
            }
        };

        sendData();

        localStorage.setItem('printData', JSON.stringify(receipt));

        router.push('/print');

        // Reset inputs
        reset();
    };

    return (
        <div className="mt-2">
            <form onSubmit={handleSubmit(submitHandler)}>
                <Input
                    label="Client Name:"
                    type="text"
                    register={register('name', {
                        required: true,
                        maxLength: 80,
                    })}
                />
                {errors.name && (
                    <span className="text-red-600 block">
                        Please enter a valid name.
                    </span>
                )}
                <Input
                    label="Client Email:"
                    type="email"
                    register={register('email', {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    })}
                />
                {errors.email && (
                    <span className="text-red-600 block">
                        Please enter a valid email address.
                    </span>
                )}
                <Select
                    label="Treatment:"
                    options={treatments}
                    register={register('treatment', { required: true })}
                />
                {errors.treatment && (
                    <span className="text-red-600 block">
                        Please select a treatment.
                    </span>
                )}
                <Input
                    label="Price:"
                    type="number"
                    register={register('price', {
                        required: true,
                        maxLength: 5,
                    })}
                />
                {errors.price && (
                    <span className="text-red-600 block">
                        Please enter a valid price.
                    </span>
                )}
                {loading ? <Loader /> : <Button label="Send" type="submit" />}
            </form>
        </div>
    );
};
