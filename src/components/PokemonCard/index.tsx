import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import getPokemonDetail from '../../apis/getPokemonDetail';
import { IPokemonListItem } from '../../interfaces';
import Card from '../Card';
import Image from '../Image';

interface IPokemonCardProps extends IPokemonListItem {
  onClick?: () => void;
}
const PokemonCard = (props: IPokemonCardProps) => {
  const { isLoading, data, isError } = useQuery([props.name], () => getPokemonDetail(props));

  return (
    <Card className="cursor-pointer flex-1 min-w-[340px] p-4" onClick={props.onClick}>
      <Image
        isLoading={isLoading}
        isError={isError}
        className="max-w-[200px] min-h-[200px]"
        alt={`${props.name}-artwork`}
        src={data?.sprites.other['official-artwork'].front_default || ''}
      />
      {props.name}
    </Card>
  );
};

export default memo(PokemonCard);
