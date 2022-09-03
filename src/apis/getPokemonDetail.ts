import { IPokemonDetail } from '../interfaces';
import Axios from './Axios';

const getPokemonDetail = ({ name }: { name: string }): Promise<IPokemonDetail> =>
  Axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((response) => response.data);

export default getPokemonDetail;
