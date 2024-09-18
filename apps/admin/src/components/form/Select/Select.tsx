import { forwardRef } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

interface SelectItemBaseProps extends Partial<MenuItemProps> {
  id: string;
  label: string;
}

export interface SelectBaseProps extends Partial<Omit<SelectProps, 'items'>> {
  items?: SelectItemBaseProps[];
}

const SelectBase = forwardRef<HTMLInputElement, SelectBaseProps>((props, ref) => {
  const { items = [], children, placeholder, ...rest } = props;

  return (
    <Select ref={ref} {...rest}>
      {placeholder && (
        <MenuItem disabled selected>
          {placeholder}
        </MenuItem>
      )}
      {items.map(({ label, id, ...item }) => (
        <MenuItem key={id} {...item}>
          {label}
        </MenuItem>
      ))}
      {children}
    </Select>
  );
});

export default SelectBase;
