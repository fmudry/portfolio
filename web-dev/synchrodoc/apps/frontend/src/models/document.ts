// scraped from /apps/backend/src/documents/types.ts

import {Tag} from "@/types/src";

export type Document = {
    id: string;
    title: string;
    automergeUrl: string | null;
    updatedAt: Date;
    tags: Tag[];
    owner: string;
};

export type DocumentCreate = Omit<
    Document,
    "id" | "updatedAt" | "tags" | "owner" | "automergeUrl"
>;
export type DocumentEdit = Omit<Document, "id" | "updatedAt" | "automergeUrl">;

export type DocumentDeleted = Omit<
    Document,
    "automergeUrl" | "updatedAt" | "tags"
> & {
    deletedAt: Date;
};

export type SharedDocument = Document & {
    permissions: "READ" | "WRITE";
};

export type DocumentShare = {
    shareWith: string;
    permissions: "READ" | "WRITE";
};

export type TagId = {
    tagId: string;
};

export type AutomergeBind = {
    automergeUrl: string;
};
