import { useQueries } from '@tanstack/react-query';
import { getPaginatedDataList } from '../../apis/getPokemonList';
import { URL_PATH } from '../../apis/routes';
import { TPokemonAttribute } from '../../interfaces';

const useGetAttributes = (...props: TPokemonAttribute[]) => {
  const queries = props.map((attr) => ({
    queryKey: [URL_PATH[attr]],
    queryFn: async () => await getPaginatedDataList({ url: URL_PATH[attr], limit: 100 }),
    staleTime: Infinity,
  }));

  return useQueries({
    queries: queries,
  });
};

export default useGetAttributes;
