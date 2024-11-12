import axios, {AxiosRequestConfig} from "axios";
import {
    ApiRespSingle,
    ApiRespMulti,
    ApiRespMultiPaginated,
} from "../models/response";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:6001",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

async function getSingle<T>(path: string) {
    const resp = await axiosInstance.get<ApiRespSingle<T>>(path);
    return resp.data;
}

async function getAll<T>(path: string, config?: AxiosRequestConfig) {
    const resp = await axiosInstance.get<ApiRespMulti<T>>(path, config);
    return resp.data;
}

async function getAllPaginated<T>(path: string, config?: AxiosRequestConfig) {
    const resp = await axiosInstance.get<ApiRespMultiPaginated<T>>(
        path,
        config
    );
    return resp.data;
}

async function postSingle<T>(path: string, payload: unknown) {
    const resp = await axiosInstance.post<ApiRespSingle<T>>(path, payload);
    return resp.data;
}

async function putSingle<T>(path: string, payload: unknown) {
    const resp = await axiosInstance.put<ApiRespSingle<T>>(path, payload);
    return resp.data;
}

async function deleteSingle<T>(path: string) {
    const resp = await axiosInstance.delete<ApiRespSingle<T>>(path);
    return resp.data;
}

async function deleteSingleBody<T>(path: string, payload: unknown) {
    const resp = await axiosInstance.delete<ApiRespSingle<T>>(path, {
        data: payload,
    });
    return resp.data;
}

const BaseApi = {
    get: axiosInstance.get,
    getAll,
    getAllPaginated,
    getSingle,
    post: axiosInstance.post,
    postSingle,
    put: axiosInstance.put,
    putSingle,
    delete: axiosInstance.delete,
    deleteSingle,
    deleteSingleBody,
};

export default BaseApi;
