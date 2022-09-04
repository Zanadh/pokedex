import { useQuery } from '@tanstack/react-query';
import Axios from '../../apis/Axios';
import { TPokemonAttribute } from '../../interfaces';

interface IGetPokemonAttrDetailProps {
  id: string | number;
  attributeType: TPokemonAttribute;
}
const useGetAttributeDetail = <T>(
  { id, attributeType }: IGetPokemonAttrDetailProps,
  enable = true,
) =>
  useQuery(
    [id, attributeType],
    (): Promise<T> => Axios.get(`${id}`).then((response) => response.data),
    {
      staleTime: Infinity,
      enabled: enable,
      retry: false,
      retryOnMount: false,
    },
  );

export default useGetAttributeDetail;
