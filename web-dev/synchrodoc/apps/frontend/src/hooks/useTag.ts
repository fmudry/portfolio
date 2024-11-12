import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {ApiRespMulti} from "../models/response";
import TagsApi from "@/api/tagApi";
import {Tag, TagEdit} from "@/models/tag";

const tagsKeys = {
    all: ["tags"] as const,
    tag: (id: string) => [...tagsKeys.all, id] as const,
    createTag: () => [...tagsKeys.all, "create"] as const,
    deleteTag: (id: string) => [...tagsKeys.all, "delete", id] as const,
    editTag: (id: string) => [...tagsKeys.all, "edit", id] as const,
};

export const useTags = () => {
    return useQuery({
        queryKey: tagsKeys.all,
        queryFn: async (): Promise<ApiRespMulti<Tag>> => {
            return await TagsApi.getAll();
        },
    });
};

export const useTagCreate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: TagEdit) => {
            return await TagsApi.createSingle(payload);
        },

        onSuccess: async () => {
            void queryClient.invalidateQueries({
                queryKey: tagsKeys.createTag(),
            });
        },
    });
};

export const useTagEdit = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: TagEdit) => {
            return await TagsApi.updateSingle(id, payload);
        },

        onSuccess: async () => {
            void queryClient.invalidateQueries({
                queryKey: tagsKeys.editTag(id),
            });
        },
    });
};

export const useTagDelete = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return await TagsApi.deleteSingle(id);
        },

        onSuccess: async () => {
            void queryClient.invalidateQueries({
                queryKey: tagsKeys.deleteTag(id),
            });
        },
    });
};
