import BaseApi from "./baseApi";
import {
    AutomergeBind,
    Document,
    DocumentCreate,
    DocumentEdit,
    DocumentShare,
    SharedDocument,
    TagId,
} from "../models/document";
import {ReqPagination} from "../models/request";
import {Tag} from "@/models/tag";

const DOCS_PREFIX = "/documents";
const SHARE_PREFIX = "/share";
const TAG_PREFIX = "/tags";

async function getSingle(id: string) {
    return BaseApi.getSingle<Document>(`${DOCS_PREFIX}/${id}`);
}

async function getAll() {
    return BaseApi.getAll<Document>(DOCS_PREFIX);
}

async function getAllPaginated(pagination: ReqPagination) {
    return BaseApi.getAllPaginated<Document>(DOCS_PREFIX, {
        params: pagination,
    });
}

async function createSingle(payload: DocumentCreate) {
    return BaseApi.postSingle<Document>(DOCS_PREFIX, payload);
}

async function updateSingle(id: string, payload: DocumentEdit) {
    return BaseApi.putSingle<Document>(`${DOCS_PREFIX}/${id}`, payload);
}

async function deleteSingle(id: string) {
    return BaseApi.deleteSingle<void>(`${DOCS_PREFIX}/${id}`);
}

async function bindSingle(id: string, payload: AutomergeBind) {
    return BaseApi.putSingle<void>(`${DOCS_PREFIX}/bind/${id}`, payload);
}

async function getAllShared() {
    return BaseApi.getAll<SharedDocument>(`${DOCS_PREFIX}/shared`);
}

async function getAllSharedPaginated(pagination: ReqPagination) {
    return BaseApi.getAllPaginated<SharedDocument>(`${DOCS_PREFIX}/shared`, {
        params: pagination,
    });
}

async function getAllShares(id: string) {
    return BaseApi.getAll<DocumentShare>(`${DOCS_PREFIX}${SHARE_PREFIX}/${id}`);
}

async function shareSingle(id: string, payload: DocumentShare) {
    return BaseApi.postSingle<void>(
        `${DOCS_PREFIX}${SHARE_PREFIX}/${id}`,
        payload
    );
}

async function changeSingleShare(id: string, payload: DocumentShare) {
    return BaseApi.putSingle<void>(
        `${DOCS_PREFIX}${SHARE_PREFIX}/${id}`,
        payload
    );
}

async function deleteSingleShare(id: string) {
    return BaseApi.deleteSingle<void>(`${DOCS_PREFIX}${SHARE_PREFIX}/${id}`);
}

async function getAllTags(id: string) {
    return BaseApi.getAll<Tag>(`${DOCS_PREFIX}${TAG_PREFIX}/${id}`);
}

async function addSingleTag(id: string, payload: TagId) {
    return BaseApi.postSingle<void>(
        `${DOCS_PREFIX}${TAG_PREFIX}/${id}`,
        payload
    );
}

async function deleteSingleTag(id: string, payload: TagId) {
    return BaseApi.deleteSingleBody<void>(
        `${DOCS_PREFIX}${TAG_PREFIX}/${id}`,
        payload
    );
}

const DocsApi = {
    getSingle,
    getAll,
    getAllPaginated,
    createSingle,
    updateSingle,
    deleteSingle,
    bindSingle,
    getAllShared,
    getAllSharedPaginated,
    getAllShares,
    shareSingle,
    changeSingleShare,
    deleteSingleShare,
    getAllTags,
    addSingleTag,
    deleteSingleTag,
};

export default DocsApi;
