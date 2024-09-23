import { ReactNode } from 'react';
import { TableCellProps } from '@mui/material/TableCell';
import { CheckboxProps } from '@mui/material/Checkbox';

export const listTableOrderKeys = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type ListTableOrder = keyof typeof listTableOrderKeys;

export interface ListTableItemProps {
  id: number;
}

export interface ListTableProps<T extends ListTableItemProps> {
  items: T[];
  renderRow: (props: T, index: number) => ReactNode;
  headingCells: TableCellProps[];
  rootPath: string;
  perPage?: number;
  checkboxProps?: Partial<CheckboxProps>;
  onRowDelete: (id: number) => void;
  onSelectedDelete: (selected: readonly number[]) => void;
  onRowDetail?: (id: number) => void;
  onRowSelect?: (id: number) => void;
  onSelectAllRows?: () => void;
  showEmptyRows?: boolean;
  searchAttrs: (keyof T)[];
  searchLangAttrs?: string[]; // TODO #lang object
}

export interface UseListTable<T extends ListTableItemProps> {
  items: T[];
  perPage?: number;
}
