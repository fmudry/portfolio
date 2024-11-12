import {Tag} from "../tag/types";
import {User} from "../user/types";

export type Document = {
    id: string;
    title: string;
    owner_id: string;
    automergeUrl: string | null;
    created_at: Date;
    deleted_at: Date | null;
    updated_at: Date | null;
    owner?: User;
    tags?: {
        tag: Tag;
    }[];
};

export type DocumentUpdate = {
    title?: string;
    owner_id?: string;
};

export type DocumentCreate = {
    title: string;
    owner_id: string;
};
