import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {ApiRespMulti, ApiRespMultiPaginated} from "../models/response";
import {Document, DocumentEdit, DocumentDeleted} from "@/models/document";
import BinApi from "@/api/binApi";


const binKeys = {
    all: ["tags"] as const,
    tag: (id: string) => [...binKeys.all, id] as const,
    getAll: () => [...binKeys.all, "getAll"] as const,
    binCreate: () => [...binKeys.all, "create"] as const,
};

export const useBin = () => {
    const query = useQuery({
        queryKey: binKeys.getAll(),
        queryFn: async (): Promise<ApiRespMulti<DocumentDeleted>> => {
            return await BinApi.getAll();
        },
    });

    return { data: query.data, isFetching: query.isFetching }
};

export const useBinPaginated = (page: number) => {
    return useQuery({
        queryKey: ["docs", page],
        queryFn: async (): Promise<ApiRespMultiPaginated<Document>> => {
            return await BinApi.getAllPaginated({page});
        },
    });
};

export const useBinCreate = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: DocumentEdit) => {
            return await BinApi.undeleteSingle(id, payload);
        },

        onSuccess: async () => {
            void queryClient.invalidateQueries({
                queryKey: binKeys.binCreate(),
            });
        },
    });
};