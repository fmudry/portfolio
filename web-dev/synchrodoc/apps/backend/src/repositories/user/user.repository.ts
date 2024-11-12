import {Result} from "@badrap/result";
import {prismaClient} from "../clients";
import {resolveError} from "../../errors";
import {DocumentShare, User, UserCreate, UserUpdate} from "./types";
import {DbResult, Pagination, PaginationQuery} from "../../types";
import {Document} from "../document/types";
import {Tag} from "../tag/types";

async function createUser(data: UserCreate): DbResult<User> {
    try {
        const result = await prismaClient.user.create({data: data});
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function readUser(userId: string): DbResult<User> {
    try {
        const result = await prismaClient.user.findFirstOrThrow({
            where: {
                id: userId,
                deleted_at: null,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function updateUser(userId: string, data: UserUpdate): DbResult<User> {
    try {
        const result = await prismaClient.user.update({
            where: {
                id: userId,
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

async function deleteUser(userId: string): DbResult<User> {
    try {
        const result = await prismaClient.user.update({
            where: {
                id: userId,
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

async function getOwnDocuments(
    userId: string,
    pagination?: Pagination
): DbResult<Document[]> {
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
        const result = await prismaClient.document.findMany({
            where: {
                owner_id: userId,
                deleted_at: null,
            },
            ...paginationQuery,
            include: {
                owner: true,
                tags: {
                    where: {
                        user_id: userId,
                    },
                    include: {
                        tag: true,
                    },
                },
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function getDeletedDocuments(
    userId: string,
    pagination?: Pagination
): DbResult<Document[]> {
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
        const result = await prismaClient.document.findMany({
            where: {
                owner_id: userId,
                deleted_at: {
                    not: null,
                },
            },
            ...paginationQuery,
            include: {
                owner: true,
                tags: {
                    where: {
                        user_id: userId,
                    },
                    include: {
                        tag: true,
                    },
                },
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function getSharedDocuments(
    userId: string,
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
                user_id: userId,
                document: {
                    deleted_at: null,
                },
            },
            include: {
                document: {
                    include: {
                        owner: true,
                        tags: {
                            where: {
                                user_id: userId,
                            },
                            include: {
                                tag: true,
                            },
                        },
                    },
                },
            },
            ...paginationQuery,
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function getTags(userId: string): DbResult<Tag[]> {
    try {
        const result = await prismaClient.tag.findMany({
            where: {
                owner_id: userId,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

async function getByEmail(email: string): DbResult<User> {
    try {
        const result = await prismaClient.user.findFirstOrThrow({
            where: {
                email,
            },
        });
        return Result.ok(result);
    } catch (e) {
        return Result.err(resolveError(e));
    }
}

export const userRepository = {
    create: createUser,
    read: readUser,
    update: updateUser,
    delete: deleteUser,
    getByEmail: getByEmail,

    getOwnDocuments: getOwnDocuments,
    getDeletedDocuments: getDeletedDocuments,
    getSharedDocuments: getSharedDocuments,

    getTags: getTags,
};
