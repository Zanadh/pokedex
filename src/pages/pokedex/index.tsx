import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import getPokemonList from '../../apis/getPokemonList';
import { PokemonCard } from '../../components';

const Pokedex = () => {
  const navigate = useNavigate();
  const { ref: bottomRef, inView } = useInView();
  // const [gridContainer] = useAutoAnimate<HTMLDivElement>(); // TODO: fix slow performance on big data

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['pokemon-list'],
    async ({ pageParam }) => await getPokemonList({ url: pageParam }),
    {
      getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    },
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat( auto-fit, minmax(340px, 1fr) )' }}
      >
        {data?.pages.map((page, i) => (
          <Fragment key={i}>
            {page.results.map((result, i) => (
              <PokemonCard onClick={() => navigate(result.name)} {...result} key={i} />
            ))}
          </Fragment>
        ))}
        <div className="w-full col-span-full">
          <div className="py-8 w-fit m-auto">
            {isFetchingNextPage
              ? '...'
              : hasNextPage
              ? 'Scroll more to load'
              : 'You have seen it all!'}
          </div>
          <div className="border" ref={bottomRef} />
        </div>
      </div>
    </>
  );
};

export default Pokedex;
