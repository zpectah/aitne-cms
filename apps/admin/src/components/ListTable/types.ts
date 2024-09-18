import { ReactNode } from 'react';
import { TableCellProps } from '@mui/material/TableCell';
import { CheckboxProps } from '@mui/material/Checkbox';

export type ListTableOrder = 'asc' | 'desc';

export interface ListTableItemProps {
  id: number;
}

export interface ListTableProps<T extends ListTableItemProps> {
  items: T[];
  renderRow: (props: T) => ReactNode;
  headingCells: TableCellProps[];
  rootPath: string;
  perPage?: number;
  checkboxProps?: Partial<CheckboxProps>;
  onRowDelete: (id: number) => void;
  onSelectedDelete: (selected: readonly number[]) => void;
  onSelectedExport: (selected: readonly number[]) => void;
  onRowDetail?: (id: number) => void;
  onRowSelect?: (id: number) => void;
  onSelectAllRows?: () => void;
  showEmptyRows?: boolean;
}

export interface UseListTable<T extends ListTableItemProps> {
  items: T[];
  perPage?: number;
}
