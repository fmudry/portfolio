import {Document} from "../document/types";

export type User = {
    id: string;
    password: string;
    email: string;
    name: string;
    created_at: Date;
    deleted_at: Date | null;
    updated_at: Date | null;
};

export type UserUpdate = {
    password?: string;
    name?: string;
};
export type UserCreate = {
    password: string;
    email: string;
    name: string;
};

// not sure if this is the best approach but it seems to work
export const Permissions: {[x: string]: "READ" | "WRITE"} = {
    READ: "READ",
    WRITE: "WRITE",
};
export type Permissions = (typeof Permissions)[keyof typeof Permissions];

export type DocumentShare = {
    id: string;
    user_id: string;
    document_id: string;
    permissions: Permissions;
    document?: Document;
    user?: User;
};
