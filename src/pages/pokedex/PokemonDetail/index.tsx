/* eslint-disable camelcase */
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import getPokemonDetail from '../../../apis/getPokemonDetail';
import { Card, PokemonCard } from '../../../components';
import Image from '../../../components/Image';
import PokemonTypeCard from '../../../components/PokemonTypeBadge';
import { IPokemonSpeciesDetail } from '../../../interfaces';

const BackButton = ({ onClick }: { onClick: () => void }) => (
  <button className="absolute bottom-[1rem] left-1" onClick={onClick}>
    <Card className="py-2 px-4 rounded-full shadow-md hover:shadow-lg">
      <i className="fa-solid fa-arrow-left"></i>
    </Card>
  </button>
);
interface TPokemonStatCardProps {
  eggGroup?: string[];
  genus?: string;
  height?: string;
  weight?: string;
  isLoading?: boolean;
}

type TAttrType = keyof Omit<TPokemonStatCardProps, 'isLoading'>;

const PokemonStatCard = (data?: TPokemonStatCardProps) => {
  if (data?.isLoading || !data) {
    return (
      <Card className="max-h-[200px] flex justify-center p-4">
        <PokeLoader width={100} />
      </Card>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, ...pokemonData } = data;
  return (
    <Card className="grid grid-cols-2 rounded overflow-hidden text-center bg-gray-200">
      {Object.keys(pokemonData).map((key, i) => {
        const value = pokemonData[key as TAttrType];
        return (
          <div className="p-2" key={i}>
            <div className="uppercase font-semibold">{key}</div>
            <div className="border bg-gray-100 rounded-lg p-2">{value}</div>
          </div>
        );
      })}
    </Card>
  );
};

const PokeLoader = ({ width }: { width?: number }) => (
  <div>
    <img src="/poke-ball.png" className="animate-spin" style={{ width }} />
  </div>
);

interface IEvolution {
  evolves_to: IEvolution[];
  is_baby: boolean;
  species: { name: 'venusaur'; url: 'https://pokeapi.co/api/v2/pokemon-species/3/' };
}
interface IPokemonEvolutionChain {
  baby_trigger_item: null;
  chain: IEvolution;
  id: 1;
}

function PokemonDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) return <div>error</div>;

  const { data: pokemonDetail } = useQuery(
    [id, 'pokemonDetail'],
    () => getPokemonDetail({ name: id, type: 'POKEMON' }),
    {
      staleTime: Infinity,
    },
  );

  const { isLoading, data, isError } = useQuery(
    [id, 'POKEMON-SPECIES'],
    () =>
      getPokemonDetail<IPokemonSpeciesDetail>({
        name: id,
        type: 'POKEMON-SPECIES',
      }),
    {
      staleTime: Infinity,
    },
  );

  const { data: pokemonChain } = useQuery(
    [data?.evolution_chain.url, 'pokemonChain'],
    () => getPokemonDetail<IPokemonEvolutionChain>({ url: data?.evolution_chain.url || '' }),
    {
      staleTime: Infinity,
    },
  );
  const evolutionData = useMemo(() => {
    const evoList: string[] = [];
    let before = null,
      after = null;

    if (!pokemonChain || !pokemonChain.chain.evolves_to.length) return { before, after };

    const flattenChain = (chain: IEvolution) => {
      evoList.push(chain.species.name);
      if (!chain.evolves_to.length) return false;
      flattenChain(chain.evolves_to[0]);
    };
    flattenChain(pokemonChain.chain);
    const index = evoList.findIndex((v) => v === id);
    if (index >= 0) {
      before = evoList[index - 1] || null;
      after = evoList[index + 1] || null;
    }
    return { before, after };
  }, [pokemonChain, id]);

  let pokemonId = String(data?.id || 0);
  if (pokemonId.length < 3)
    pokemonId =
      `${Array(3 - String(data?.id || 0).length)
        .fill(0)
        .join('')}` + pokemonId;

  const maxStatValue = Math.max(...(pokemonDetail?.stats.map((v) => v.base_stat) || [0]));

  return (
    <div className="flex flex-col h-full font-mono">
      <div className="relative h-[30%]">
        <BackButton onClick={() => navigate('/pokedex')} />
        <Image
          isLoading={isLoading}
          isError={isError}
          className={
            'absolute bottom-[-20%] right-0 left-0 m-auto z-10  group-hover:scale-110 animate-bounce max-w-[330px] min-w-[250px] w-[50%]'
          }
          alt={`${id}-artwork`}
          src={pokemonDetail?.sprites.other['official-artwork'].front_default || ''}
        />
      </div>
      <Card className="flex flex-col flex-1 h-[50%] p-4 gap-4 overflow-auto">
        <div className="flex justify-between border-b">
          <div className="flex flex-col">
            <span className="font-bold" style={{ fontSize: 20 }}>
              #{pokemonId}
            </span>
            <span className="font-bold uppercase" style={{ fontSize: '2rem' }}>
              {id}
            </span>
          </div>
          <div className="flex gap-2 items-end mb-2">
            {pokemonDetail?.types?.map(({ type, slot }) => (
              <PokemonTypeCard type={type.name} key={slot} />
            ))}
          </div>
        </div>
        <span className="my-2">
          {data?.flavor_text_entries.find((v) => v.language.name === 'en')?.flavor_text}
        </span>
        <div className="flex-1 ">
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat( auto-fit, minmax(300px, 1fr) )' }}
          >
            <PokemonStatCard
              eggGroup={data?.egg_groups.map((v) => v.name)}
              genus={
                data?.genera.find((v) => v.language.name === 'en')?.genus || data?.genera[0].genus
              }
              height={(pokemonDetail?.height || 0) / 10 + ' m'}
              weight={(pokemonDetail?.weight || 0) / 10 + ' kg'}
            />
            <div className="border border-dashed flex p-2 rounded-lg">
              <div className="capitalize">
                {pokemonDetail?.stats.map((data, i) => (
                  <div key={i}>{data.stat.name}</div>
                ))}
              </div>
              <div className="ml-1 flex-1">
                {pokemonDetail?.stats.map((data, i) => (
                  <div key={i} className="flex items-center pr-2">
                    :
                    <div
                      className="ml-2 bg-green-200 overflow-clip border-green-900 border-2 flex-1 rounded-l-lg rounded-r-xl flex"
                      style={{ height: '1rem' }}
                    >
                      <div
                        className="bg-green-800 flex-1 "
                        style={{
                          height: '1rem',
                          maxWidth: `${(data.base_stat / maxStatValue) * 100}%`,
                          opacity: (data.base_stat - 10) / maxStatValue,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pl-4">
                  <span>0</span>
                  <span>{maxStatValue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="font-bold">
          <span>Evolution</span>
          <div className="p-4 pt-2 border flex justify-between gap-4">
            <div className="flex flex-col">
              <span>From</span>
              {evolutionData.before ? (
                <PokemonCard
                  name={evolutionData.before}
                  size="sm"
                  onClick={() => navigate(('/pokedex/' + evolutionData.before) as string)}
                />
              ) : (
                <div className="items-center m-auto">No Data</div>
              )}
            </div>
            <div className="flex flex-col">
              <span>To</span>
              {evolutionData.after ? (
                <PokemonCard
                  name={evolutionData.after}
                  size="sm"
                  onClick={() => navigate(('/pokedex/' + evolutionData.after) as string)}
                />
              ) : (
                <div className="items-center m-auto">No Data</div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PokemonDetail;
