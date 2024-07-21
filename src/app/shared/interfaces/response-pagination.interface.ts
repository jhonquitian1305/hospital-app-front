export interface ResponsePagination<T> {
  elements:      T[];
  totalElements: number;
  limit:         number;
  offset:        number;
}
