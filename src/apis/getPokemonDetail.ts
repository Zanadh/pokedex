import { IPokemonDetail } from '../interfaces';
import Axios from './Axios';
import { URL_PATH } from './routes';

type TPokemonDetail = 'POKEMON' | 'POKEMON-SPECIES';

const getPokemonDetail = <T = IPokemonDetail>({
  name,
  type = 'POKEMON',
  url,
}:
  | {
      name: string;
      type?: TPokemonDetail;
      url?: string;
    }
  | {
      name?: string;
      type?: TPokemonDetail;
      url: string;
    }): Promise<T> => {
  if (!name && !url) throw new Error();
  return Axios.get(url || `${URL_PATH[type]}/${name}`).then((response) => response.data);
};

export const getPokemonSpecies = ({ name }: { name: string }): Promise<IPokemonDetail> =>
  Axios.get(`${URL_PATH.POKEMON}/${name}`).then((response) => response.data);

export default getPokemonDetail;
