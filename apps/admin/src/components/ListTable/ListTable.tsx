import { useMemo, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

import { ListTableProps, ListTableItemProps } from './types';
import { useListTable } from './useListTable';

const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 30];

const ListTable = <T extends ListTableItemProps>({
  items = [],
  renderRow,
  headingCells = [],
  perPage,
  rootPath,
  onRowDelete,
  onRowSelect,
  onSelectAllRows,
  onSelectedDelete,
  onSelectedExport,
  checkboxProps,
  showEmptyRows,
}: ListTableProps<T>) => {
  const {
    rows,
    onSelectAll,
    onSelect,
    onPageChange,
    onRowsPerPageChange,
    selected,
    page,
    rowsPerPage,
    isIndeterminate,
    isChecked,
    emptyRows,
    // TODO
    // onSort,
    // order,
    // orderBy,
  } = useListTable<T>({
    items,
    perPage,
  });

  const navigate = useNavigate();

  const openHandler = (id: number) => {
    navigate(`${rootPath}/${id}`);
  };

  const deleteRowHandler = (id: number) => {
    // TODO #confirm here or later???
    //
    onRowDelete(id);
  };

  const deleteSelectedHandler = () => {
    // TODO #confirm here or later???
    //
    onSelectedDelete?.(selected);
  };

  const exportSelectedHandler = () => {
    onSelectedExport?.(selected);
  };

  const rowSelectHandler = (event: MouseEvent<unknown>, id: number) => {
    onSelect(event, id);
    onRowSelect?.(id);
  };

  const allSelectHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onSelectAll(event);
    onSelectAllRows?.();
  };

  const renderEmptyRows = useMemo(() => {
    const empties = [];

    if (!showEmptyRows) return null;

    for (let i = 0; i < emptyRows; i++) {
      empties.push(
        <TableRow key={i} sx={{ height: '70px' }}>
          <TableCell>&nbsp;</TableCell>
          {headingCells.map(({ id }) => (
            <TableCell key={id}>&nbsp;</TableCell>
          ))}
          <TableCell>&nbsp;</TableCell>
        </TableRow>
      );
    }

    return empties;
  }, [showEmptyRows, emptyRows, headingCells]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        <Stack
          sx={({ spacing }) => ({
            padding: spacing(2),
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <Box>searchbar</Box>
          <Stack direction="row" gap={1}>
            <Button disabled={selected.length === 0} onClick={deleteSelectedHandler} size="small" variant="outlined">
              Delete selected
            </Button>
            <Button disabled={selected.length === 0} onClick={exportSelectedHandler} size="small" variant="outlined">
              Export selected
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <TableContainer>
          <Table aria-labelledby="listTable.title" sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ width: '50px', textAlign: 'center' }}>
                  <Checkbox
                    checked={isChecked}
                    indeterminate={isIndeterminate}
                    inputProps={{
                      'aria-label': 'select all',
                    }}
                    onChange={allSelectHandler}
                    {...checkboxProps}
                  />
                </TableCell>
                {headingCells.map(({ id, ...rest }) => (
                  <TableCell key={id} {...rest} />
                ))}
                <TableCell align="right" sx={{ width: '200px' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item: T) => {
                const isSelected = selected.includes(item.id);

                return (
                  <TableRow key={item.id} onDoubleClick={(e) => rowSelectHandler(e, item.id)}>
                    <TableCell component="th" padding="checkbox" sx={{ width: '50px', textAlign: 'center' }}>
                      <Checkbox checked={isSelected} onClick={(e) => rowSelectHandler(e, item.id)} {...checkboxProps} />
                    </TableCell>
                    {renderRow(item)}
                    <TableCell align="right" sx={{ width: '200px' }}>
                      <Stack direction="row" gap={2} sx={{ display: 'inline-flex' }}>
                        <IconButton onClick={() => openHandler(item.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => deleteRowHandler(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {renderEmptyRows}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={items.length}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        />
      </Paper>
    </Box>
  );
};

export default ListTable;
