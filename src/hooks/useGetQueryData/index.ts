import { useQueryClient } from '@tanstack/react-query';

const useGetFetchQuery = (name: string) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData([name]);
};

export default useGetFetchQuery;
