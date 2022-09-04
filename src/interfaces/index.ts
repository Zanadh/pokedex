import { IPokemonListItem } from './pokemon';
export * from './pokemon';

export interface IPaginationResponse<T = IPokemonListItem> {
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
