import { z } from 'zod';

export const loginSchema = z.object({
    login: z.string(),
    password: z.string(),
});

export type TloginSchema = z.infer<typeof loginSchema>;
