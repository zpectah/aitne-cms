import { ReactNode } from 'react';
import { TableCellProps } from '@mui/material/TableCell';
import { CheckboxProps } from '@mui/material/Checkbox';

export const listTableOrderKeys = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type ListTableOrder = keyof typeof listTableOrderKeys;
export type ListTableItemLang = { [p: string]: unknown };

export interface ListTableItemProps {
  id: number;
  lang?: {
    [p: string]: ListTableItemLang;
  };
}

interface ListTableSearch<T extends ListTableItemProps, TL extends ListTableItemLang> {
  searchAttrs: (keyof T)[];
  searchLangAttrs?: (keyof TL)[];
}

export interface ListTableProps<T extends ListTableItemProps, TL extends ListTableItemLang = ListTableItemLang>
  extends ListTableSearch<T, TL> {
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
}

export interface UseListTable<T extends ListTableItemProps> {
  items: T[];
  perPage?: number;
}

export interface UseListTableSearch<T extends ListTableItemProps, TL extends ListTableItemLang>
  extends ListTableSearch<T, TL> {
  items: T[];
}
