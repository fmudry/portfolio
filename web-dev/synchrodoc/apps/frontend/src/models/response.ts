export type ApiRespMulti<T> = {
    items: T[];
    message?: string;
  };
  
  export type ApiRespMultiPaginated<T> = ApiRespMulti<T> & {
    pagination: Pagination;
  };
  
  export type ApiRespSingle<T> = {
    item: T;
    message?: string;
  };
  
  export type Pagination = {
    currentPage: number;
    totalPages: number;
  };
