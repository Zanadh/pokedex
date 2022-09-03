export * from './pokemon';

export interface IPaginationResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface IPaginationParams {
  offset?: number;
  limit?: number;
  url?: string;
}
