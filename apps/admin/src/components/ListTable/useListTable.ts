import { useState, useMemo, MouseEvent, ChangeEvent } from 'react';

import { ListTableItemProps, UseListTable, ListTableOrder } from './types';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator<Key extends keyof never>(
  order: ListTableOrder,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const useListTable = <T extends ListTableItemProps>({ items = [], perPage = 15 }: UseListTable<T>) => {
  const [order, setOrder] = useState<ListTableOrder>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>('id');
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(perPage);

  const sortRequestHandler = (event: MouseEvent<unknown>, property: keyof T) => {
    const isAsc = orderBy === property && order === 'asc';

    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const clickSelectAllHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = items.map((n) => n.id);

      setSelected(newSelected);

      return;
    }

    setSelected([]);
  };

  const clickSelectHandler = (event: MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const changePageHandler = (event: unknown, newPage: number) => setPage(newPage);

  const changeRowsPerPageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const visibleRows = useMemo(
    // @ts-expect-error @ts-ignore @typescript-eslint/ban-ts-comment
    () => [...items].sort(getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [items, order, orderBy, page, rowsPerPage]
  );

  const isIndeterminate = useMemo(() => selected.length > 0 && selected.length < items.length, [selected, items]);
  const isChecked = useMemo(() => items.length > 0 && selected.length === items.length, [selected, items]);

  return {
    rows: visibleRows,
    onSort: sortRequestHandler,
    onSelectAll: clickSelectAllHandler,
    onSelect: clickSelectHandler,
    onPageChange: changePageHandler,
    onRowsPerPageChange: changeRowsPerPageHandler,
    emptyRows,
    order,
    orderBy,
    selected,
    page,
    rowsPerPage,
    isIndeterminate,
    isChecked,
  };
};
