import {Result} from "@badrap/result";
import {prismaClient} from "../clients";
import {Document, DocumentCreate, DocumentUpdate} from "./types";
import {MissingArgsError, resolveError} from "../../errors";
import {DocumentShare, Permissions} from "../user/types";
import {DbResult, Pagination, PaginationQuery} from "../../types";
import {Tag} from "../tag/types";

async function createDocument(data: DocumentCreate): DbResult<Document> {
    try {
        const result = await prismaClient.document.create({data: data});
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function readDocument(documentId: string): DbResult<Document> {
    try {
        const result = await prismaClient.document.findFirstOrThrow({
            where: {
                id: documentId,
                deleted_at: null,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function updateDocument(
    documentId: string,
    data: DocumentUpdate
): DbResult<Document> {
    try {
        const result = await prismaClient.document.update({
            where: {
                id: documentId,
                deleted_at: null,
            },
            data: {
                ...data,
                updated_at: new Date(),
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function deleteDocument(documentId: string): DbResult<Document> {
    try {
        const result = await prismaClient.document.update({
            where: {
                id: documentId,
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

async function undeleteDocument(documentId: string): DbResult<Document> {
    try {
        const result = await prismaClient.document.update({
            where: {
                id: documentId,
                deleted_at: {
                    not: null,
                },
            },
            data: {
                deleted_at: null,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function getShares(
    documentId: string,
    pagination?: Pagination
): DbResult<DocumentShare[]> {
    try {
        const paginationQuery: PaginationQuery =
            pagination && pagination.items
                ? {
                      take: pagination.items,
                      orderBy: {
                          id: "asc",
                      },
                      cursor: pagination.lastId
                          ? {
                                id: pagination.lastId,
                            }
                          : undefined,
                      skip: pagination.lastId ? 0 : 1,
                  }
                : {};
        const result = await prismaClient.shared_document.findMany({
            where: {
                document_id: documentId,
            },
            ...paginationQuery,
            include: {
                user: true,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function addShare(
    documentId: string,
    userId: string,
    permissions: Permissions
): DbResult<DocumentShare> {
    try {
        const result = await prismaClient.shared_document.create({
            data: {
                document_id: documentId,
                user_id: userId,
                permissions: permissions,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function removeShare(
    shareId?: string,
    user_document?: {
        document_id: string;
        user_id: string;
    }
): DbResult<DocumentShare> {
    if (typeof shareId === "undefined" && typeof user_document === "undefined")
        return Result.err(new MissingArgsError());
    try {
        // allows you to specify one or both arguments, should you wish to be extra explicit :))
        const filterQuery =
            typeof shareId === "undefined"
                ? {user_id_document_id: user_document}
                : typeof user_document === "undefined"
                  ? {id: shareId}
                  : {id: shareId, user_id_document_id: user_document};
        const result = await prismaClient.shared_document.delete({
            where: filterQuery,
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function updateShare(
    permissions: Permissions,
    shareId?: string,
    user_document?: {
        document_id: string;
        user_id: string;
    }
): DbResult<DocumentShare> {
    if (typeof shareId === "undefined" && typeof user_document === "undefined")
        return Result.err(new MissingArgsError());
    try {
        // allows you to specify one or both arguments, should you wish to be extra explicit :))
        const filterQuery =
            typeof shareId === "undefined"
                ? {user_id_document_id: user_document}
                : typeof user_document === "undefined"
                  ? {id: shareId}
                  : {id: shareId, user_id_document_id: user_document};
        const result = await prismaClient.shared_document.update({
            where: filterQuery,
            data: {
                permissions: permissions,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function getTags(documentId: string, userId: string): DbResult<Tag[]> {
    try {
        const result = await prismaClient.user_Document_Tag.findMany({
            where: {
                document_id: documentId,
                user_id: userId,
            },
            // TODO figure this out
            // omit tags that have been deleted
            include: {
                tag: true,
            },
        });
        return Result.ok(result.map((x) => x.tag));
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function addTag(documentId: string, userId: string, tagId: string) {
    try {
        const result = await prismaClient.user_Document_Tag.create({
            data: {
                document_id: documentId,
                user_id: userId,
                tag_id: tagId,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function removeTag(
    documentTagId?: string,
    user_document_tag?: {
        document_id: string;
        user_id: string;
        tag_id: string;
    }
) {
    if (
        typeof documentTagId === "undefined" &&
        typeof user_document_tag === "undefined"
    )
        return Result.err(new MissingArgsError());
    try {
        // allows you to specify one or both arguments, should you wish to be extra explicit :))
        const filterQuery =
            typeof documentTagId === "undefined"
                ? {user_id_document_id_tag_id: user_document_tag}
                : typeof user_document_tag === "undefined"
                  ? {id: documentTagId}
                  : {
                        id: documentTagId,
                        user_id_document_id_tag_id: user_document_tag,
                    };
        const result = await prismaClient.user_Document_Tag.delete({
            where: filterQuery,
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function addUrl(documentId: string, url: string): DbResult<{}> {
    try {
        const result = await prismaClient.document.update({
            where: {
                id: documentId,
                deleted_at: null,
            },
            data: {
                automergeUrl: url,
                updated_at: new Date(),
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

export const documentRepository = {
    create: createDocument,
    read: readDocument,
    update: updateDocument,
    delete: deleteDocument,
    undelete: undeleteDocument,
    addUrl: addUrl,

    getShares: getShares,
    addShare: addShare,
    removeShare: removeShare,
    updateShare: updateShare,

    getTags: getTags,
    addTag: addTag,
    removeTag: removeTag,
};
