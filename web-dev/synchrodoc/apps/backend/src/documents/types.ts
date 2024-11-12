export interface Document {
    id: string;
    title: string;
    automergeUrl: string | null;
    updatedAt: Date;
    tags?: Tag[];
    owner?: string;
}

export type SharedDocument = Document & {
    permissions: "READ" | "WRITE";
};

export interface DocumentShare {
    userEmail: string;
    permissions: "READ" | "WRITE";
}

export interface TagId {
    id: string;
}

export interface Tag {
    id: string;
    color: string;
    name: string;
}
