export interface IRequestOptions<T> {
  limit?: number;
  offset?: number;
  page?: number;
  select?: Array<keyof T>;
  populate?: Array<{
    path: string;
    select?: string[];
  }>;
}
