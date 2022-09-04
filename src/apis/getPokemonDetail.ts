import { IPokemonDetail } from '../interfaces';
import Axios from './Axios';
import { URL_PATH } from './routes';

const getPokemonDetail = ({ name }: { name: string }): Promise<IPokemonDetail> =>
  Axios.get(`${URL_PATH.POKEMON}/${name}`).then((response) => response.data);

export default getPokemonDetail;
