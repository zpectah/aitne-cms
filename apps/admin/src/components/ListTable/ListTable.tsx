import { useMemo, useCallback, useState, ChangeEvent, MouseEvent } from 'react';
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
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useConfirmSore } from '../../hooks';
import { SearchInput } from '../input';
import { ListTableProps, ListTableItemProps, ListTableItemLang } from './types';
import { ROWS_PER_PAGE_OPTIONS, SEARCH_MIN_LENGTH } from './constants';
import { useListTable } from './useListTable';
import { useListTableSearch } from './useListTableSearch';

const RowDeleteButton = styled(IconButton)({
  filter: 'grayscale(1)',

  '&:hover': {
    filter: 'grayscale(0)',
  },
});

const SelectedItemsMenu = ({
  selected,
  onDelete,
  onToggle,
}: {
  selected: number;
  onDelete?: () => void;
  onToggle?: () => void;
}) => {
  const { t } = useTranslation(['table']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const closeHandler = () => setAnchorEl(null);

  const deleteSelectedHandler = () => {
    onDelete?.();
    closeHandler();
  };

  const toggleSelectedHandler = () => {
    onToggle?.();
    closeHandler();
  };

  return (
    <div>
      <Button
        aria-controls={open ? 'selected-items-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        disabled={selected === 0}
        id="selected-items-button"
        onClick={openHandler}
        variant="outlined"
      >
        {t('label.selected', { selected })}
      </Button>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'selected-items-button',
        }}
        anchorEl={anchorEl}
        id="selected-items-menu"
        onClose={closeHandler}
        open={open}
      >
        {onDelete && <MenuItem onClick={deleteSelectedHandler}>{t('btn.deleteSelected')}</MenuItem>}
        {onToggle && <MenuItem onClick={toggleSelectedHandler}>{t('btn.toggleSelected')}</MenuItem>}
      </Menu>
    </div>
  );
};

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
    // TODO
    // onSort,
    // order,
    // orderBy,
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
          <Box>
            <SearchInput
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('table:label.search')}
              size="small"
              value={searchQuery}
            />
          </Box>
          <Stack direction="row" gap={2}>
            {toolbarSlot}
            <SelectedItemsMenu onDelete={deleteSelectedConfirmHandler} selected={selected.length} />
          </Stack>
        </Stack>
        <Divider />
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchQuery, selected.length, setSearchQuery]
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
                      <Stack direction="row" gap={2} sx={{ display: 'inline-flex' }}>
                        <IconButton color="primary" onClick={() => openHandler(item.id)}>
                          <EditIcon />
                        </IconButton>
                        <RowDeleteButton color="error" onClick={() => deleteRowConfirmHandler(item.id)}>
                          <DeleteIcon />
                        </RowDeleteButton>
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
