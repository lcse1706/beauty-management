import { ReceiptsFromAirTable } from '@/lib';

export const sortReceipts = (data: ReceiptsFromAirTable[]) => {
    const sortedReceipts = [...data].sort((a, b) => {
        const [numberA, monthA, yearA] = a.fields.receipt_id
            .split('/')
            .map((num: string) => parseInt(num));
        const [numberB, monthB, yearB] = b.fields.receipt_id
            .split('/')
            .map((num: string) => parseInt(num));
        if (yearA !== yearB) return yearA - yearB;
        if (monthA !== monthB) return monthA - monthB;
        return numberA - numberB;
    });
    return sortedReceipts;
};
