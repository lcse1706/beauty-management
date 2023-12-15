'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, Input, Loader } from '@/components/ui';
import { useDataContext, usePopupContext } from '@/context';
import { ReceiptDetailsProps } from '@/lib';
import { deleteReceipt, updateRecord } from '@/services';

export const ReceiptDetails = ({ data }: ReceiptDetailsProps) => {
    const [receipt, setReceipt] = useState(data[0].fields);
    const { receiptId, loading, setLoading } = useDataContext();
    const { setShowPopup, setMessage } = usePopupContext();

    const router = useRouter();

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [confirmationModal, setConfirmationModal] = useState<boolean>(false);

    const openConfirmationModal = () => {
        setConfirmationModal(true);
    };

    const closeConfirmationModal = () => {
        setConfirmationModal(false);
    };

    const deleteHandler = async () => {
        openConfirmationModal();
        if (confirmationModal) {
            closeConfirmationModal();

            setLoading(true);
            try {
                await deleteReceipt(receiptId);
                setMessage('Receipt delete successful!');
                router.push('/receiptlist');
            } catch (error) {
                console.error(error);
                setMessage('Something went wrong!');
            } finally {
                setLoading(false);
                setShowPopup(true);
            }
        }
    };

    const editHandler = () => {
        setIsEditing(true);
    };

    const saveHandler = async () => {
        setIsEditing(false);
        setLoading(true);

        try {
            await updateRecord(receiptId, receipt);
            setMessage('Receipt edit successful!');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setShowPopup(true);
        }
    };

    const backHandler = () => {
        router.back();
    };

    const onChangeHandler = (
        event: React.ChangeEvent<HTMLInputElement>,
        field: string,
    ) => {
        setReceipt({
            ...receipt,
            [field]: event.target.value,
        });
    };

    const inputs = (
        <div className="max-w-md mx-auto flex flex-col items-center">
            <Input
                label="Receipt number:"
                type="text"
                value={receipt.receipt_id}
                onChange={(event) => onChangeHandler(event, 'receipt_id')}
            ></Input>
            <Input
                label="Name: "
                type="text"
                value={receipt.name}
                onChange={(event) => onChangeHandler(event, 'name')}
            ></Input>
            <Input
                label="Email: "
                type="email"
                value={receipt.email}
                onChange={(event) => onChangeHandler(event, 'email')}
            ></Input>
            <Input
                label="Treatment: "
                type="text"
                value={receipt.treatment}
                onChange={(event) => onChangeHandler(event, 'treatment')}
            ></Input>
            <Input
                label="Price"
                type="text"
                value={receipt.price}
                onChange={(event) => onChangeHandler(event, 'price')}
            ></Input>
        </div>
    );
    const paragraphs = (
        <div className="max-w-md mx-auto p-5 bg-white rounded shadow-md border border-gray-200">
            <div className="flex justify-between mb-2">
                <span className="text-gray-700">Receipt number:</span>
                <span className="text-gray-900">{receipt.receipt_id}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span className="text-gray-700">Name:</span>
                <span className="text-gray-900">{receipt.name}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span className="text-gray-700">Email:</span>
                <span className="text-gray-900">{receipt.email}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span className="text-gray-700">Treatment:</span>
                <span className="text-gray-900">{receipt.treatment}</span>
            </div>
            <div className="flex justify-between mb-2">
                <span className="text-gray-700 font-semibold">Price:</span>
                <span className="text-gray-900 font-semibold">
                    {receipt.price} kr
                </span>
            </div>
        </div>
    );

    const buttons = (
        <div>
            {isEditing ? (
                <Button
                    className="bg-green-500 hover:bg-green-700"
                    label="Save"
                    onClick={saveHandler}
                />
            ) : (
                <>
                    <Button label="<<<" onClick={backHandler} />
                    <Button label="Edit" onClick={editHandler} />
                    <Button
                        className="bg-red-500 hover:bg-red-700 my-2"
                        label="Delete"
                        onClick={deleteHandler}
                    />
                </>
            )}
        </div>
    );

    const modal = (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-700 bg-opacity-80">
            <div className="modal-container bg-white p-4 rounded translate-y-[-10vh] ">
                <p className="text-gray-800 text-lg mb-4">
                    Are you sure you want to delete?
                </p>
                <div className="flex justify-end">
                    <Button
                        label="Cancel"
                        onClick={closeConfirmationModal}
                        className="mr-2 bg-gray-500"
                    />
                    <Button
                        label="Delete"
                        onClick={deleteHandler}
                        className="bg-red-500 hover:bg-red-700"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {confirmationModal && modal}
            {receipt && (
                <div className="receiptDetails">
                    {isEditing ? inputs : paragraphs}

                    {loading ? <Loader /> : buttons}
                </div>
            )}
        </div>
    );
};
