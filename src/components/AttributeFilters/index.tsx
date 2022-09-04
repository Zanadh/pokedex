import useGetAttributes from '../../hooks/useGetAttributes';
import { IPokemonListItem, TPokemonAttribute } from '../../interfaces';
import Card from '../Card';
import Select from '../Select';

const reformAttributeToSelectOption = (props?: IPokemonListItem[]) =>
  props
    ?.map((data) => ({
      value: data.url,
      label: data.name,
    }))
    .sort((a, b) => (a.label > b.label ? 1 : -1)) || [];

export type TSelectValue = Record<'label' | 'value', string> | null;
// TODO: refactor to be dynamic
const AttributeFilters = (props?: {
  onSelectFilter?: (v: TSelectValue, type: TPokemonAttribute) => void;
  value: Record<TPokemonAttribute, Record<'label' | 'value', string> | null>;
}) => {
  const [
    { data: eggGroupData, isFetching: isFetchingEggGroup },
    { data: typeData, isFetching: isFetchingType },
  ] = useGetAttributes('EGG-GROUP', 'TYPE');

  return (
    <div className="flex gap-3">
      <Card className="flex items-center rounded-full gap-4 transition-all w-fit float-right">
        <Select
          placeholder="Select Type..."
          isDisabled={isFetchingType}
          options={reformAttributeToSelectOption(typeData?.results)}
          onChange={(v) =>
            props?.onSelectFilter && props?.onSelectFilter(v as TSelectValue, 'TYPE')
          }
          isClearable
          value={props?.value?.TYPE}
        />
      </Card>
      <Card className="flex items-center rounded-full gap-4 transition-all w-fit float-right">
        <Select
          placeholder="Select Egg-group..."
          isDisabled={isFetchingEggGroup}
          options={reformAttributeToSelectOption(eggGroupData?.results)}
          onChange={(v) =>
            props?.onSelectFilter && props?.onSelectFilter(v as TSelectValue, 'EGG-GROUP')
          }
          isClearable
          value={props?.value?.['EGG-GROUP']}
        />
      </Card>
    </div>
  );
};

export default AttributeFilters;
