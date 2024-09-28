import { useMemo, useCallback, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material';
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';

import { capitalizeString } from '@common';
import { useConfirmSore } from '../../hooks';
import { SearchInput } from '../input';
import { ListTableProps, ListTableItemProps, ListTableItemLang, listTableOrderKeys } from './types';
import { ROWS_PER_PAGE_OPTIONS, SEARCH_MIN_LENGTH } from './constants';
import { useListTable } from './useListTable';
import { useListTableSearch } from './useListTableSearch';
import ListTableSelectedMenu from './ListTableSelectedMenu';

const RowDeleteButton = styled(IconButton)({
  filter: 'grayscale(1)',

  '&:hover': {
    filter: 'grayscale(0)',
  },
});

const ListTable = <T1 extends ListTableItemProps, T2 extends ListTableItemLang>({
  items = [],
  renderRow,
  headingCells = [],
  perPage,
  rootPath,
  onRowDelete,
  onRowSelect,
  onSelectAllRows,
  onSelectedDelete,
  checkboxProps,
  showEmptyRows,
  searchAttrs = [],
  searchLangAttrs = [],
  toolbarSlot,
  sortColumns = [],
  onRowToggle,
  onSelectedToggle,
}: ListTableProps<T1, T2>) => {
  const { results, searchQuery, setSearchQuery } = useListTableSearch<T1, T2>({ items, searchAttrs, searchLangAttrs });

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
    setSelected,
    onSort,
    order,
    orderBy,
  } = useListTable<T1>({
    items: results,
    perPage,
  });

  const { t } = useTranslation(['common', 'table']);
  const { onConfirm } = useConfirmSore();
  const navigate = useNavigate();

  const checkLastPage = useCallback(() => {
    if (rows.length <= selected.length || rows.length <= 1) {
      const newPage = page > 0 ? page - 1 : page;

      onPageChange(null, newPage);
    }
  }, [selected, rows, page, onPageChange]);

  const openHandler = (id: number) => navigate(`${rootPath}/${id}`);
  const toggleRowHandler = (id: number) => onRowToggle?.(id);

  const toggleSelectedHandler = () => {
    onSelectedToggle?.(selected);
    setSelected([]);
  };

  const deleteRowHandler = (id: number) => {
    onRowDelete(id);
    checkLastPage();
    setSelected([]);
  };

  const deleteRowConfirmHandler = (id: number) =>
    onConfirm(() => deleteRowHandler(id), 'Do you want to delete this item?');

  const deleteSelectedHandler = () => {
    onSelectedDelete(selected);
    checkLastPage();
    setSelected([]);
  };

  const deleteSelectedConfirmHandler = () =>
    onConfirm(() => deleteSelectedHandler(), 'Do you want to delete these items?');

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

  const renderSearchNoResultsRow = useMemo(() => {
    const cols = headingCells.length + 2;

    if (searchQuery.length >= SEARCH_MIN_LENGTH && results.length === 0) {
      return (
        <TableRow sx={{ textAlign: 'center' }}>
          <TableCell colSpan={cols}>{t('table:msg.notFound', { query: searchQuery })}</TableCell>
        </TableRow>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headingCells, searchQuery, results]);

  const renderToolbar = useMemo(
    () => (
      <>
        <Stack
          gap={2}
          sx={({ spacing }) => ({
            padding: spacing(2),
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
          })}
        >
          <Stack direction="row" gap={2}>
            <SearchInput
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('table:label.search')}
              size="small"
              value={searchQuery}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <ToggleButtonGroup value={orderBy}>
              {sortColumns.map(String).map((item) => (
                <ToggleButton
                  aria-label={`sort table by: ${item}`}
                  key={item}
                  onClick={() => onSort(item as keyof T1)}
                  size="small"
                  sx={{ px: 1.75, gap: 1 }}
                  value={item}
                >
                  {capitalizeString(item)}
                  {orderBy === item ? (
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    <>
                      {order === listTableOrderKeys.asc ? (
                        <ArrowDownwardIcon fontSize="inherit" />
                      ) : (
                        <ArrowUpwardIcon fontSize="inherit" />
                      )}
                    </>
                  ) : null}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>
          <Stack direction="row" gap={2}>
            {toolbarSlot}

            <ListTableSelectedMenu
              onDelete={deleteSelectedConfirmHandler}
              onToggle={toggleSelectedHandler}
              selected={selected.length}
              withToggle={!!onSelectedToggle}
            />
          </Stack>
        </Stack>
        <Divider />
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchQuery, selected, setSearchQuery, toolbarSlot, onSort, sortColumns]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }}>
        {renderToolbar}
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
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
                  {t('table:title.actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item: T1, index) => {
                const isSelected = selected.includes(item.id);

                return (
                  <TableRow key={item.id} onDoubleClick={(e) => rowSelectHandler(e, item.id)}>
                    <TableCell component="th" padding="checkbox" sx={{ width: '50px', textAlign: 'center' }}>
                      <Checkbox checked={isSelected} onClick={(e) => rowSelectHandler(e, item.id)} {...checkboxProps} />
                    </TableCell>
                    {renderRow(item, index)}
                    <TableCell align="right" sx={{ width: '200px' }}>
                      <Stack direction="row" gap={1} sx={{ display: 'inline-flex' }}>
                        {!!onRowToggle && (
                          <Tooltip enterDelay={250} placement="top-start" title="Toggle active">
                            <IconButton
                              color={item.active === 1 ? 'primary' : 'default'}
                              onClick={() => toggleRowHandler(item.id)}
                            >
                              {item.active === 1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip enterDelay={250} placement="top-start" title="Open detail">
                          <IconButton color="primary" onClick={() => openHandler(item.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip enterDelay={250} placement="top-start" title="Delete row">
                          <RowDeleteButton color="error" onClick={() => deleteRowConfirmHandler(item.id)}>
                            <DeleteIcon />
                          </RowDeleteButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {renderEmptyRows}
              {renderSearchNoResultsRow}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="footer"
          count={results.length}
          labelDisplayedRows={({ from, to, count }) => t('table:label.displayRows', { from, to, count })}
          labelRowsPerPage={t('table:label.rowsPerPage')}
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
