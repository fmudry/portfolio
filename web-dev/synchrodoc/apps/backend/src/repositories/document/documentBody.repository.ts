import {Result} from "@badrap/result";
import {minioClient} from "../clients";
import {DbResult} from "../../types";

import streamToString from "stream-to-string";
import {UnknownError} from "../../errors";

async function getBody(document_id: string): DbResult<string> {
    try {
        const result = await streamToString(
            await minioClient.getObject("documents", document_id)
        );
        return Result.ok(result);
    } catch (e) {
        return Result.err(new UnknownError());
    }
}

async function putBody(document_id: string, body: string) {
    try {
        const result = await minioClient.putObject(
            "documents",
            document_id,
            body
        );
        return Result.ok(result);
    } catch (e) {
        return Result.err(new UnknownError());
    }
}

async function deleteBody(document_id: string) {
    try {
        const result = await minioClient.removeObject("documents", document_id);
        return Result.ok(result);
    } catch (e) {
        return Result.err(new UnknownError());
    }
}

export const documentBodyRepository = {
    read: getBody,
    write: putBody,
    delete: deleteBody,
};
