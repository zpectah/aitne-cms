import { forwardRef, useMemo } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

import { useTagsQuery } from '../../../hooks';

export type TagsDataPickerProps = Omit<SelectProps, 'items' | 'children'> & {
  ignoredId?: number[];
};

const TagsDataPicker = forwardRef<HTMLInputElement, TagsDataPickerProps>(
  ({ ignoredId = [], placeholder, ...rest }, ref) => {
    const { query } = useTagsQuery();

    const items = useMemo(() => {
      if (query.data) {
        const rows: MenuItemProps[] = [];

        query.data.forEach((item) => {
          const isAllowed = !ignoredId.includes(item.id);

          if (isAllowed)
            rows.push({
              key: `tag.picker_${item.id}`,
              children: item.name,
              value: item.id,
            });
        });

        return rows;
      }

      return [];
    }, [query, ignoredId]);

    return (
      <Select ref={ref} {...rest}>
        {placeholder && (
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
        )}
        {items.map(({ key, ...item }) => (
          <MenuItem key={key} {...item} />
        ))}
      </Select>
    );
  }
);

export default TagsDataPicker;
