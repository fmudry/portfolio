import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";

export class NotImplementedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NotImplementedError";
    }
}

export class DbError extends Error {}
export class NotFoundError extends Error {}
export class UniqueDuplicateError extends Error {}
export class UnknownError extends Error {}
export class MissingArgsError extends Error {}

export const resolveError = (e: Error) => {
    if (e instanceof PrismaClientKnownRequestError) {
        switch (e.code) {
            case "P2001":
                return new NotFoundError();
            case "P2002":
                return new UniqueDuplicateError();
            case "P2003":
                // foreign key not found
                return new NotFoundError();
            case "P2025":
                // FindFirstOrThrow
                return new NotFoundError();
            default:
                return new DbError();
        }
    }
    return new UnknownError();
};
