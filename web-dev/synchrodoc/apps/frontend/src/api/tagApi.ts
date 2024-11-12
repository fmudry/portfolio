import BaseApi from "./baseApi";
import {Tag, TagEdit} from "@/models/tag";

const TAG_PREFIX = "/tags";

async function getAll() {
    return BaseApi.getAll<Tag>(TAG_PREFIX);
}

async function createSingle(payload: TagEdit) {
    return BaseApi.postSingle<Tag>(TAG_PREFIX, payload);
}

async function updateSingle(id: string, payload: TagEdit) {
    return BaseApi.putSingle<Tag>(`${TAG_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: string) {
    return BaseApi.deleteSingle<Tag>(`${TAG_PREFIX}/${id}`);
}

const TagsApi = {
    getAll,
    createSingle,
    updateSingle,
    deleteSingle,
};

export default TagsApi;
