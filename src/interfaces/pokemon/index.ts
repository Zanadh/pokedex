export interface IPokemonListItem {
  name: string;
  url: string;
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
  abilities: [
    {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    },
  ];
  forms: [
    {
      name: string;
      url: string;
    },
  ];
  game_indices: [
    {
      game_index: number;
      version: {
        name: string;
        url: string;
      };
    },
  ];
  held_items: [];
  moves: [
    {
      move: {
        name: string;
        url: string;
      };
      version_group_details: [
        {
          level_learned_at: number;
          move_learn_method: {
            name: string;
            url: string;
          };
          version_group: {
            name: string;
            url: string;
          };
        },
        {
          level_learned_at: number;
          move_learn_method: {
            name: string;
            url: string;
          };
          version_group: {
            name: string;
            url: string;
          };
        },
      ];
    },
  ];
  past_types: [];
  species: {
    name: string;
    url: string;
  };
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
      stat: {
        name: string;
        url: string;
      };
    },
  ];
  types: [
    {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    },
  ];
}
