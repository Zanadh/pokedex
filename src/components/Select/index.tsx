import ReactSelect from 'react-select';
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager';

// TODO: setup select color styles
// const pokemonTypeColourStyles: StylesConfig<ColourOption, true> = {
// };

const Select = (props: StateManagerProps) => (
  <ReactSelect
    styles={{
      control: (base) => ({
        ...base,
        border: 0,
        boxShadow: 'none',
        minWidth: 200,
      }),
    }}
    theme={(theme) => ({
      ...theme,
      borderRadius: 20,
      boxShadow: 'none',
      colors: {
        ...theme.colors,
      },
    })}
    {...props}
  />
);

export default Select;
