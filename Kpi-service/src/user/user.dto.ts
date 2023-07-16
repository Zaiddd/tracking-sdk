import * as z from 'zod';

export const CreateUserSchema = z.object({
    userId: z.number(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    userId: z.number().optional(),
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type LoginUserDto = z.infer<typeof LoginUserSchema>;