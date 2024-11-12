import {z} from "zod";
import {paginationSchema} from "../validationSchemas";

export const getDeletedDocumentsSchema = z.object({
    query: paginationSchema,
});

export const restoreDocumentSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
