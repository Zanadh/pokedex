import { IPaginationResponse, IPokemonListItem, IPaginationParams } from '../interfaces';
import Axios from './Axios';

const getPokemonList = ({
  limit,
  offset,
  url,
}: IPaginationParams): Promise<IPaginationResponse<IPokemonListItem>> =>
  Axios.get(url || 'https://pokeapi.co/api/v2/pokemon', { params: { limit, offset } }).then(
    (response) => response.data,
  );

export default getPokemonList;
