import {z} from "zod";

export const createTagSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        color: z.string().min(1), // TODO validate colors
    }),
});

export const updateTagSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        color: z.string().min(1), // TODO validate colors
    }),
    params: z.object({
        id: z.string(),
    }),
});

export const deleteTagSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
