import { IPaginationParams, IPaginationResponse, IPokemonListItem } from '../interfaces';
import Axios from './Axios';

interface IGetPokemonParams extends IPaginationParams {
  name?: string;
  id?: number;
}

const getPokemonList = ({
  url,
  ...params
}: IGetPokemonParams): Promise<IPaginationResponse<IPokemonListItem>> =>
  Axios.get(url || 'https://pokeapi.co/api/v2/pokemon', { params }).then(
    (response) => response.data,
  );

export default getPokemonList;

interface IgetPaginatedDataList extends IPaginationParams {
  url: string;
}

export const getPaginatedDataList = <T = IPokemonListItem>({
  url,
  ...params
}: IgetPaginatedDataList): Promise<IPaginationResponse<T>> =>
  Axios.get(url, { params }).then((response) => response.data);
