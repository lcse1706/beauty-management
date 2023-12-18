import { z } from 'zod';

export const loginSchema = z.object({
    login: z.string(),
    password: z.string(),
});
export type TloginSchema = z.infer<typeof loginSchema>;

const ReceiptFields = z.object({
    receipt_id: z.string(),
    name: z.string().min(2),
    email: z.string().email(),
    treatment: z.string(),
    price: z.string(),
});

type ReceiptFieldsType = z.infer<typeof ReceiptFields>;

export interface User {
    id: number;
    login: string;
    password: string;
}

export interface ReceiptDisplayF {
    data: {
        id: string;
        fields: ReceiptFieldsType & {
            date: string;
        };
    };
}

export interface ReceiptDetailsProps {
    data: Array<{
        id: string;
        fields: ReceiptFieldsType;
    }>;
}

export const ReceiptDTO = ReceiptFields;

export const ReceiptAirTableFormat = z.object({
    fields: ReceiptFields,
});

export interface Receipt extends ReceiptFieldsType {}

export interface ReceiptToAirTable {
    fields: Receipt;
}

export interface ReceiptsFromAirTable {
    id: string;
    createdTime: string;
    fields: ReceiptFieldsType & {
        date: string;
    };
}

export const ReceiptFetch = z.object({
    id: z.string(),
    createdTime: z.string(),
    fields: z.object({
        ...ReceiptFields.shape,
        date: z.string(),
    }),
});

export const ReceiptFetchArray = z.array(ReceiptFetch);
