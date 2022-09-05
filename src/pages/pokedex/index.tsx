import { useInfiniteQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from 'react-router-dom';
import { getPaginatedDataList } from '../../apis/getPokemonList';
import { URL_PATH } from '../../apis/routes';
import { AttributeFilters, Card, PokemonCard } from '../../components';
import { TSelectValue } from '../../components/AttributeFilters';
import useGetAttributeDetail from '../../hooks/useGetAttributeDetail';
import {
  IPokemonEggGroupDetail,
  IPokemonListItem,
  IPokemonTypeDetail,
  TPokemonAttribute,
} from '../../interfaces';

const filterDefaultValue = { TYPE: null, 'EGG-GROUP': null };
type TFilterState = Record<TPokemonAttribute, TSelectValue>;

const Pokedex = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ref: bottomRef, inView } = useInView();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [{ isOpen, keyword }, setSearchInput] = useState({ isOpen: false, keyword: '' });
  const [filter, setFilter] = useState<TFilterState>(filterDefaultValue);

  // TODO: create customHook usePokemonData
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ['pokemon-list'],
    async ({ pageParam = URL_PATH.POKEMON }) =>
      await getPaginatedDataList<IPokemonListItem>({ url: pageParam }),
    {
      staleTime: Infinity,
      getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
      getNextPageParam: (firstPage) => firstPage.next ?? undefined,
    },
  );

  const { data: pokemonTypeAttrDetail, refetch: fetchTypeAttrDetail } =
    useGetAttributeDetail<IPokemonTypeDetail>(
      {
        id: filter.TYPE?.value || 0,
        attributeType: 'TYPE',
      },
      !!filter.TYPE?.value,
    );

  const { data: pokemonTypeAttrEggGroup, refetch: fetchTypeAttrEggGroup } =
    useGetAttributeDetail<IPokemonEggGroupDetail>(
      {
        id: filter['EGG-GROUP']?.value || 0,
        attributeType: 'TYPE',
      },
      !!filter['EGG-GROUP']?.value,
    );

  useEffect(() => {
    !!filter.TYPE?.value && fetchTypeAttrDetail();
  }, [filter.TYPE?.value]);

  useEffect(() => {
    !!filter['EGG-GROUP']?.value && fetchTypeAttrEggGroup();
  }, [filter['EGG-GROUP']?.value]);

  const fetchedPokemon = useMemo(() => {
    let allData: IPokemonListItem[] = [];
    if (!!filter.TYPE?.value && pokemonTypeAttrDetail) {
      allData = pokemonTypeAttrDetail.pokemon.flatMap(({ pokemon }) => pokemon);
    } else if (!!filter['EGG-GROUP']?.value && pokemonTypeAttrEggGroup) {
      allData = pokemonTypeAttrEggGroup.pokemon_species.map((pokemon) => pokemon);
    } else {
      if (!data) return allData;
      allData = data.pages.flatMap((page) => page.results);
    }

    return allData.filter(
      (pokemon) => pokemon.name.includes(keyword?.toLowerCase()) || pokemon.name === id,
    );
  }, [
    data?.pages.length,
    keyword,
    filter.TYPE?.value,
    pokemonTypeAttrDetail,
    pokemonTypeAttrEggGroup,
  ]);

  useEffect(() => {
    if (inView && !isFetching && !keyword) {
      fetchNextPage();
    }
  }, [inView, isFetching, keyword]);

  const handleSelectFilter = (v: TSelectValue, type: TPokemonAttribute) => {
    setFilter({ ...filterDefaultValue, [type]: v || null });
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <AttributeFilters onSelectFilter={handleSelectFilter} value={filter} />
        <Card
          className={clsx(
            'pl-4 flex flex-row-reverse items-center transition-all rounded-full overflow-hidden',
            isOpen ? 'w-[223px]' : 'w-[48px]',
          )}
        >
          <div
            className="pr-4 cursor-pointer"
            onClick={() => {
              if (!isOpen) searchInputRef.current?.focus();
              else if (searchInputRef.current?.value) searchInputRef.current.value = '';
              setSearchInput((prev) => ({
                keyword: prev.isOpen ? '' : prev.keyword,
                isOpen: !prev.isOpen,
              }));
            }}
          >
            <i
              className={clsx(
                'fa-solid  text-red-600 hover:scale-110',
                isOpen ? 'fa-circle-xmark' : 'fa-magnifying-glass',
              )}
            ></i>
          </div>
          <input
            className={clsx('outline-none', isOpen ? 'w-full' : 'w-0')}
            onChange={({ target }) =>
              setSearchInput((prev) => ({ ...prev, keyword: target?.value || '' }))
            }
            ref={searchInputRef}
          />
        </Card>
      </div>

      {/* TODO: Change to virtualized list */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat( auto-fit, minmax(340px, 1fr) )' }}
      >
        {fetchedPokemon.map((pokemon, i) => {
          const isSelected = id === pokemon.name;
          return (
            <PokemonCard
              animate={isSelected}
              onClick={() => navigate(isSelected ? '' : pokemon.name)}
              {...pokemon}
              key={i}
            />
          );
        })}
      </div>

      <div className="w-full">
        <div
          className={clsx(
            'pt-8 pb-12 w-fit m-auto ',
            isFetchingNextPage ? 'animate-pulse' : hasNextPage && 'animate-bounce',
          )}
        >
          {isFetchingNextPage
            ? 'Exploring the bush...'
            : hasNextPage
            ? 'Scroll more to load'
            : 'You have seen it all!'}
        </div>
        <div className="border" ref={bottomRef} />
      </div>
    </>
  );
};

export default memo(Pokedex);
