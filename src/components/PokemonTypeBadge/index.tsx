import clsx from 'clsx';
import { TPokemonTypeAttr } from '../../interfaces';
import Card from '../Card';

export const typeAttrColorClass = {
  fighting: { text: 'text-white', bg: 'bg-[#D56723]', border: 'border-[#D56723]' },
  flying: { text: 'text-black', bg: 'bg-[#3DC8EF]', border: 'border-[#3DC8EF]' },
  poison: { text: 'text-white', bg: 'bg-[#B97FC9]', border: 'border-[#B97FC9]' },
  rock: { text: 'text-white', bg: 'bg-[#A28C21]', border: 'border-[#A28C21]' },
  water: { text: 'text-white', bg: 'bg-[#4491C4]', border: 'border-[#4491C4]' },
  grass: { text: 'text-black', bg: 'bg-[#9ACC50]', border: 'border-[#9ACC50]' },
  electric: { text: 'text-black', bg: 'bg-[#EED535]', border: 'border-[#EED535]' },
  dark: { text: 'text-white', bg: 'bg-[#616161]', border: 'border-[#616161]' },
  ice: { text: 'text-black', bg: 'bg-[#51C4E7]', border: 'border-[#51C4E7]' },
  bug: { text: 'text-white', bg: 'bg-[#729E3F]', border: 'border-[#729E3F]' },
  dragon: { text: 'text-white', bg: 'bg-[#F367BA]', border: 'border-[#F367BA]' },
  fairy: { text: 'text-black', bg: 'bg-[#FCB9E9]', border: 'border-[#FCB9E9]' },
  fire: { text: 'text-white', bg: 'bg-[#FD7D24]', border: 'border-[#FD7D24]' },
  ghost: { text: 'text-white', bg: 'bg-[#7B61A3]', border: 'border-[#7B61A3]' },
  ground: { text: 'text-black', bg: 'bg-[#AA9842]', border: 'border-[#AA9842]' },
  normal: { text: 'text-white', bg: 'bg-[#A4ABAF]', border: 'border-[#A4ABAF]' },
  psychic: { text: 'text-white', bg: 'bg-[#9EB7B8]', border: 'border-[#9EB7B8]' },
  shadow: { text: 'text-white', bg: 'bg-[#313131]', border: 'border-[#313131]' },
  steel: { text: 'text-black', bg: 'bg-[#9EB7B8]', border: 'border-[#9EB7B8]' },
  unknown: { text: 'teite', bg: 'bg-white', border: 'border-white' },
};

const PokemonTypeCard = ({ type }: { type: TPokemonTypeAttr }) => (
  <Card
    className={clsx(
      'px-2 py-1 border-2 border-gray-300 capitalize rounded-xl font-bold',
      typeAttrColorClass[type].bg,
    )}
  >
    {type}
  </Card>
);

export default PokemonTypeCard;
