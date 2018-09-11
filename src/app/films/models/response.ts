export interface ResponseHttpApi<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
