import BaseApi from "./baseApi";
import {Document, DocumentDeleted} from "../models/document";
import {ReqPagination} from "../models/request";

const BIN_PREFIX = "/bin";

async function getAll() {
    return BaseApi.getAll<DocumentDeleted>(BIN_PREFIX);
}

async function getAllPaginated(pagination: ReqPagination) {
    return BaseApi.getAllPaginated<Document>(BIN_PREFIX, {
        params: pagination,
    });
}

async function undeleteSingle(id: string) {
    return BaseApi.postSingle<void>(`${BIN_PREFIX}/${id}`, {});
}

const BinApi = {
    getAll,
    getAllPaginated,
    undeleteSingle,
};

export default BinApi;
