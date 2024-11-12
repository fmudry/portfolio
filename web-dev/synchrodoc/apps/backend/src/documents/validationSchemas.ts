import {z} from "zod";
import {paginationSchema} from "../validationSchemas";

export const getDocumetsSchema = z.object({
    query: paginationSchema,
});

export const getSharedDocumentsSchema = getDocumetsSchema;

export const createDocumentSchema = z.object({
    body: z.object({
        title: z.string(),
    }),
});

export const renameDocumentSchema = z.object({
    body: z.object({
        newTitle: z.string(),
    }),
    params: z.object({
        id: z.string(),
    }),
});

export const deleteDocumentSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export const shareDocumentSchema = z.object({
    body: z.object({
        shareWith: z.string().email(),
        permissions: z.string().refine((val) => {
            return val === "READ" || val === "WRITE";
        }),
    }),
    params: z.object({
        id: z.string(),
    }),
});

export const getDocumentSharesSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export const changeShareSchema = shareDocumentSchema;

export const deleteShareSchema = z.object({
    body: z.object({
        shareWith: z.string().email(),
    }),
    params: z.object({
        id: z.string(),
    }),
});

export const getDocumentTagsSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export const addDocumentTagSchema = z.object({
    body: z.object({
        tagId: z.string().min(1),
    }),
    params: z.object({
        id: z.string(),
    }),
});

export const removeDocumentTagSchema = z.object({
    body: z.object({
        tagId: z.string().min(1),
    }),
    params: z.object({
        id: z.string(),
    }),
});

export const addDocumentUrlSchema = z.object({
    body: z.object({
        automergeUrl: z.string().refine((url) => {
            return url.startsWith("automerge:");
        }),
    }),
    params: z.object({
        id: z.string(),
    }),
});
