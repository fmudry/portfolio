export interface Tag {
    id: string;
    name: string;
    color: string;
}

export interface Collaborator {
    email: string;
    permission: "READ" | "WRITE";
}

export interface Document {
    id: string;
    title: string;
    owner: string;
    updatedAt: Date | null;
    tags: Tag[];
}
