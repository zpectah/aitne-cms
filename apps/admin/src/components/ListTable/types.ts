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

interface ListTableSearch<T1 extends ListTableItemProps, T2 extends ListTableItemLang> {
  searchAttrs: (keyof T1)[];
  searchLangAttrs?: (keyof T2)[];
}

export interface ListTableProps<T1 extends ListTableItemProps, T2 extends ListTableItemLang = ListTableItemLang>
  extends ListTableSearch<T1, T2> {
  items: T1[];
  renderRow: (props: T1, index: number) => ReactNode;
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
  toolbarSlot?: ReactNode;
  sortColumns: (keyof T1)[];
}

export interface UseListTable<T extends ListTableItemProps> {
  items: T[];
  perPage?: number;
}

export interface UseListTableSearch<T1 extends ListTableItemProps, T2 extends ListTableItemLang>
  extends ListTableSearch<T1, T2> {
  items: T1[];
}
