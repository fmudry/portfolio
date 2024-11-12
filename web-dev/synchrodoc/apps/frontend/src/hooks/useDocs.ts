import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {
    ApiRespMulti,
    ApiRespMultiPaginated,
    ApiRespSingle,
} from "../models/response";
import {
    Document,
    DocumentCreate,
    DocumentEdit,
    DocumentShare,
    SharedDocument,
} from "@/models/document";
import DocsApi from "@/api/docsApi";

export const docsKeys = {
    all: ["docs"] as const,
    doc: (id: string) => [...docsKeys.all, id] as const,
    paginatedDocs: (id?: string) => [...docsKeys.all, "paginated", id] as const,
    sharedDocs: (id: string) => [...docsKeys.all, id, "shared"] as const,
    createDoc: () => [...docsKeys.all, "create"] as const,
    deleteDoc: (id: string) => [...docsKeys.all, "delete", id] as const,
    collaborators: (docId: string) => ["collaborator", docId] as const,
    addCollaborator: (docId: string) => ["collaborator", docId] as const,
};

export const useDocGet = (id: string) => {
    return useQuery({
        queryKey: docsKeys.doc(id),
        queryFn: async (): Promise<ApiRespSingle<Document>> => {
            return await DocsApi.getSingle(id);
        },
    });
};

export const useDocsGetAll = () => {
    return useQuery({
        queryKey: docsKeys.all,
        queryFn: async (): Promise<ApiRespMulti<Document>> => {
            return await DocsApi.getAll();
        },
    });
};

export const useDocsShares = (id: string) => {
    return useQuery({
        queryKey: docsKeys.sharedDocs(id),
        queryFn: async (): Promise<ApiRespMulti<SharedDocument>> => {
            return await DocsApi.getAllShared();
        },
    });
};

export const useDocsPaginated = (lastId?: string, items?: number) => {
    const query = useQuery({
        queryKey: docsKeys.paginatedDocs(lastId),
        queryFn: async (): Promise<ApiRespMultiPaginated<Document>> => {
            return await DocsApi.getAllPaginated({lastId, items});
        },
    });

    return {data: query.data, isFetching: query.isFetching};
};

export const useDocsCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: DocumentCreate) => {
            return await DocsApi.createSingle(payload);
        },

        onSuccess: async () => {
            void queryClient.invalidateQueries({
                queryKey: docsKeys.createDoc(),
            });
        },
    });
};

export const useDocEdit = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: DocumentEdit) => {
            return await DocsApi.updateSingle(id, payload);
        },

        onSuccess: async () => {
            void queryClient.invalidateQueries({
                queryKey: docsKeys.all,
            });
        },
    });
};

export const useDocDelete = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return await DocsApi.deleteSingle(id);
        },

        onSuccess: async () => {
            void queryClient.invalidateQueries({
                queryKey: docsKeys.deleteDoc(id),
            });
        },
    });
};

export const useCollaborators = (id: string) => {
    return useQuery({
        queryKey: docsKeys.collaborators(id),
        queryFn: async (): Promise<ApiRespMulti<DocumentShare>> => {
            return await DocsApi.getAllShares(id);
        },
    });
};

export const useAddCollaborator = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: DocumentShare) => {
            return await DocsApi.shareSingle(id, payload);
        },

        onSuccess: async () => {
            void queryClient.invalidateQueries({
                queryKey: docsKeys.addCollaborator(id),
            });
        },
    });
};
