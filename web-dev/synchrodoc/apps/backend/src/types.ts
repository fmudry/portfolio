import type {Result} from "@badrap/result";

export type DbResult<T> = Promise<Result<T>>;
export type Pagination = {
    items?: number;
    lastId?: string;
};

export type PaginationQuery =
    | {}
    | {
          take: number;
          skip: number;
          orderBy: {
              id: "asc";
          };
          cursor?: {
              id: string;
          };
      };
