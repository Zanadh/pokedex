import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import getPokemonDetail from '../../apis/getPokemonDetail';
import { IPokemonDetail } from '../../interfaces';
import Card from '../Card';
import Image from '../Image';
import PokemonTypeCard, { typeAttrColorClass } from '../PokemonTypeBadge';

interface IPokemonCardProps {
  onClick?: (pokemonDetailData: IPokemonDetail) => void;
  animate?: boolean;
  size?: 'lg' | 'sm';
  name: string;
}

const PokemonCard = ({ size = 'lg', ...props }: IPokemonCardProps) => {
  const { isLoading, data, isError, isSuccess } = useQuery(
    [props.name, 'pokemonDetail'],
    () => getPokemonDetail(props),
    {
      staleTime: Infinity,
    },
  );

  let pokemonId = String(data?.id || 0);
  if (pokemonId.length < 3)
    pokemonId =
      `${Array(3 - String(data?.id || 0).length)
        .fill(0)
        .join('')}` + pokemonId;

  const typeAttr = data?.types?.map((type) => type.type.name) || [];
  if (size === 'sm') {
    return (
      <div
        className="group relative cursor-pointer flex-1 min-h-[120px] max-w-xs"
        onClick={() => data && props.onClick && props.onClick(data)}
      >
        <div className="absolute -left-4 z-10">
          <Image
            isLoading={isLoading}
            isError={isError}
            className={clsx(
              'group-hover:scale-110 hover:animate-bounce transition-all max-w-[130px] min-h-[130px] ',
            )}
            style={{ animationDuration: '800ms' }}
            alt={`${props.name}-artwork`}
            src={(isSuccess && data?.sprites?.other.home.front_default) || ''}
          />
        </div>
        <Card
          className={clsx(
            'p-2 border border-b-4 overflow-hidden relative',
            typeAttrColorClass[typeAttr[1] || 'unknown'].border,
            typeAttrColorClass[typeAttr[0] || 'unknown'].bg,
          )}
        >
          <span className="font-bold uppercase" style={{ fontSize: 20 }}>
            {data?.name}
          </span>
        </Card>
        <div className="absolute bottom-0 font-bold z-10">
          <span
            className="bottom-5"
            style={{
              textShadow: '1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue',
              color: 'white',
            }}
          >
            #{pokemonId}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative cursor-pointer flex-1 min-w-[340px] min-h-[240px] "
      onClick={() => data && props.onClick && props.onClick(data)}
    >
      <div className="absolute top-2 left-2 z-10">
        <span className="font-bold font-mono">#{pokemonId}</span>
        <Image
          isLoading={isLoading}
          isError={isError}
          className={clsx(
            'group-hover:scale-110 hover:animate-bounce transition-all max-w-[200px] min-h-[200px]',
          )}
          style={{ animationDuration: '800ms' }}
          alt={`${props.name}-artwork`}
          src={(isSuccess && data?.sprites?.other.home.front_default) || ''}
        />
      </div>
      <Card
        className={clsx(
          'h-1/2 p-4 border border-b-4 overflow-hidden relative',
          typeAttrColorClass[typeAttr[1] || 'unknown'].border,
          typeAttrColorClass[typeAttr[0] || 'unknown'].bg,
        )}
      >
        <img
          className="absolute"
          src="/poke-ball.png"
          alt="image"
          style={{ width: 250, top: -100, left: -30 }}
        />
        <div className="flex flex-col float-right text-right justify-between h-full font-mono">
          <span className="font-bold uppercase" style={{ fontSize: 20 }}>
            {data?.name}
          </span>
          <div className="flex flex-row-reverse gap-1">
            {data?.types?.map(({ type, slot }) => (
              <PokemonTypeCard type={type.name} key={slot} />
            ))}
          </div>
        </div>
      </Card>
      <div
        className="h-1/2 max-w-[175px] mt-2 w-1/2 border-black-700 float-right grid grid-cols-2 font-mono"
        style={{ fontSize: 14 }}
      >
        <div className="font-bold flex flex-col">
          Height <span className="pl-1">{(data?.height || 0) / 10} m</span>
        </div>
        <div className="font-bold flex flex-col">
          Weight <span className="pl-1">{(data?.weight || 0) / 10} kg</span>
        </div>
        <div className="col-span-2 font-bold flex flex-col">
          Base experience yield <span className="pl-1">{data?.base_experience}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
