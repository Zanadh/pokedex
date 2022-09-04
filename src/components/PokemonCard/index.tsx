import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { memo } from 'react';
import getPokemonDetail from '../../apis/getPokemonDetail';
import { IPokemonListItem } from '../../interfaces';
import Card from '../Card';
import Image from '../Image';

interface IPokemonCardProps extends IPokemonListItem {
  onClick?: () => void;
  animate?: boolean;
}
const PokemonCard = (props: IPokemonCardProps) => {
  const { isLoading, data, isError } = useQuery([props.name], () => getPokemonDetail(props), {
    staleTime: Infinity,
  });
  let pokemonId = String(data?.id || 0);
  if (pokemonId.length < 3)
    pokemonId =
      `${Array(3 - String(data?.id || 0).length)
        .fill(0)
        .join('')}` + pokemonId;

  return (
    <div
      className="group relative cursor-pointer flex-1 min-w-[340px] min-h-[240px] "
      onClick={props.onClick}
    >
      <div className="absolute top-2 left-2">
        <span className="font-bold font-mono">#{pokemonId}</span>
        <div className={clsx(!!props.animate && 'animate-bounce')}>
          <Image
            isLoading={isLoading}
            isError={isError}
            className={clsx(
              'group-hover:scale-110 transition-all max-w-[200px] min-h-[200px]',
              !!props.animate && 'scale-125',
            )}
            style={{ animationDuration: '800ms' }}
            alt={`${props.name}-artwork`}
            src={data?.sprites.other['official-artwork'].front_default || ''}
          />
        </div>
      </div>
      <Card className="h-1/2 flex flex-row-reverse p-4">
        <span className="font-bold uppercase">{data?.name}</span>
      </Card>
    </div>
  );
};

export default memo(PokemonCard);
