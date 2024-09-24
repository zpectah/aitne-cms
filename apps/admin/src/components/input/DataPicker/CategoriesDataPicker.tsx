import { forwardRef, useMemo } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

import { useCategoriesQuery } from '../../../hooks';

export type CategoriesDataPickerProps = Omit<SelectProps, 'items' | 'children'> & {
  ignoredId?: number[];
};

const CategoriesDataPicker = forwardRef<HTMLInputElement, CategoriesDataPickerProps>(
  ({ ignoredId = [], ...rest }, ref) => {
    const { query } = useCategoriesQuery();

    const items = useMemo(() => {
      if (query.data) {
        const rows: MenuItemProps[] = [];

        query.data.forEach((item) => {
          const isAllowed = !ignoredId.includes(item.id);

          if (isAllowed)
            rows.push({
              key: `category.picker_${item.id}`,
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
        <MenuItem value="">No parent</MenuItem>
        {items.map(({ key, ...item }) => (
          <MenuItem key={key} {...item} />
        ))}
      </Select>
    );
  }
);

export default CategoriesDataPicker;
