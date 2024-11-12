import {Result} from "@badrap/result";
import {prismaClient} from "../clients";
import {resolveError} from "../../errors";
import {Tag, TagCreate, TagUpdate} from "./types";
import {DbResult} from "../../types";

async function createTag(data: TagCreate): DbResult<Tag> {
    try {
        const result = await prismaClient.tag.create({data: data});
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function readTag(tagId: string): DbResult<Tag> {
    try {
        const result = await prismaClient.tag.findFirstOrThrow({
            where: {
                id: tagId,
                deleted_at: null,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function updateTag(tagId: string, data: TagUpdate): DbResult<Tag> {
    try {
        const result = await prismaClient.tag.update({
            where: {
                id: tagId,
                deleted_at: null,
            },
            data: data,
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function deleteTag(tagId: string): DbResult<Tag> {
    try {
        const result = await prismaClient.tag.update({
            where: {
                id: tagId,
                deleted_at: null,
            },
            data: {
                deleted_at: new Date(),
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

export const tagRepository = {
    create: createTag,
    read: readTag,
    update: updateTag,
    delete: deleteTag,
};
