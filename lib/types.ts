import { z } from 'zod';

export const loginSchema = z.object({
    login: z.string(),
    password: z.string(),
});

export type TloginSchema = z.infer<typeof loginSchema>;

export type Users = {
    id: number;
    login: string;
    password: string;
};

export type ReceiptDisplayF = {
    data: {
        id: string;
        fields: {
            receipt_id: string;
            name: string;
            email: string;
            treatment: string;
            price: string;
            date: string;
        };
    };
};
export type ReceiptDetailsProps = {
    data: Array<{
        id: string;
        fields: {
            receipt_id: string;
            name: string;
            email: string;
            treatment: string;
            price: string;
            date: string;
        };
    }>;
};

export const ReceiptDTO = z.object({
    receipt_id: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    treatment: z.string(),
    price: z.string(),
});

export const ReceiptAirTableFormat = z.object({
    fields: z.object({
        ...ReceiptDTO.shape,
    }),
});

export interface Receipt {
    receipt_id: string;
    name: string;
    email: string;
    treatment: string;
    price: string;
}

export interface ReceiptToAirTable {
    fields: Receipt;
}

export interface ReceiptsFromAirTable {
    id: string;
    fields: {
        receipt_id: string;
        name: string;
        email: string;
        treatment: string;
        price: string;
        date: string;
    };
}

export const ReceiptFetch = z.object({
    id: z.string(),
    fields: z.object({
        ...ReceiptDTO.shape,
        date: z.string(),
    }),
});

export const ReceiptFetchArray = z.array(ReceiptFetch);
