export interface IPokemonListItem {
  name: string;
  url: string;
}

export type TPokemonAttribute = 'TYPE' | 'EGG-GROUP';

export type TPokemonTypeAttr =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';

interface PokemonAbility {
  ability: IPokemonListItem[];
  is_hidden: boolean;
  slot: number;
}
// TODO: split interface
export interface IPokemonDetail {
  id: number;
  name: string;
  order: number;
  height: number;
  weight: number;
  base_experience: number;
  is_default: boolean;
  location_area_encounters: string;
  abilities: PokemonAbility[];
  forms: [
    {
      name: string;
      url: string;
    },
  ];
  game_indices: [
    {
      game_index: number;
      version: IPokemonListItem[];
    },
  ];
  held_items: [];
  moves: [
    {
      move: IPokemonListItem[];
      version_group_details: [
        {
          level_learned_at: number;
          move_learn_method: IPokemonListItem[];
          version_group: IPokemonListItem[];
        },
        {
          level_learned_at: number;
          move_learn_method: IPokemonListItem[];
          version_group: IPokemonListItem[];
        },
      ];
    },
  ];
  past_types: [];
  species: IPokemonListItem;
  sprites: {
    back_default: string | null;
    back_female: null;
    back_shiny: string | null;
    back_shiny_female: null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: null;
    other: {
      dream_world: {
        front_default: string | null;
        front_female: string | null;
      };
      home: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: null;
      };
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
  stats: [
    {
      base_stat: number;
      effort: number;
      stat: IPokemonListItem;
    },
  ];
  types: [
    {
      slot: number;
      type: {
        name: TPokemonTypeAttr;
        url: string;
      };
    },
  ];
}

export interface IPokemonEggGroupDetail {
  id: number;
  name: string;
  pokemon_species: IPokemonListItem[];
}

export interface IPokemonTypeDetail {
  id: number;
  damage_relations: {
    double_damage_from: IPokemonListItem[];
    double_damage_to: IPokemonListItem[];
    half_damage_from: IPokemonListItem[];
    half_damage_to: IPokemonListItem[];
    no_damage_from: IPokemonListItem[];
    no_damage_to: IPokemonListItem[];
  };
  game_indices: {
    game_index: number;
    generation: IPokemonListItem;
  }[];
  generation: IPokemonListItem;
  move_damage_class: IPokemonListItem;
  moves: IPokemonListItem[];
  name: string;
  names: { language: IPokemonListItem; name: string }[];
  pokemon: { pokemon: IPokemonListItem; slot: string }[];
}

export interface IPokemonSpeciesDetail {
  base_happiness: number;
  capture_rate: number;
  color: IPokemonListItem;
  egg_groups: IPokemonListItem[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: IPokemonListItem[];
  flavor_text_entries: {
    flavor_text: string;
    language: IPokemonListItem;
    version: IPokemonListItem;
  }[];
  form_descriptions: [];
  forms_switchable: false;
  gender_rate: number;
  genera: {
    genus: string;
    language: IPokemonListItem;
  }[];
  generation: IPokemonListItem;
  growth_rate: IPokemonListItem;
  habitat: IPokemonListItem;
  has_gender_differences: false;
  hatch_counter: number;
  id: number;
  is_baby: false;
  is_legendary: false;
  is_mythical: false;
  name: string;
  names: {
    language: IPokemonListItem;
    name: string;
  }[];
  order: number;
  pal_park_encounters: {
    area: IPokemonListItem;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: IPokemonListItem;
  }[];
  shape: IPokemonListItem;
  varieties: {
    is_default: true;
    pokemon: IPokemonListItem;
  }[];
}
