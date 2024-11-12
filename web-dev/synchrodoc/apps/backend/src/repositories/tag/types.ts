export type Tag = {
    id: string;
    name: string;
    color: string;
    owner_id: string;
    deleted_at: Date | null;
};

export type TagUpdate = {
    name?: string;
    color?: string;
};

export type TagCreate = {
    name: string;
    color: string;
    owner_id: string;
};
