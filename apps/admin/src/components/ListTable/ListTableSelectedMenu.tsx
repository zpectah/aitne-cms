import { useTranslation } from 'react-i18next';
import { MouseEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

export default SelectedItemsMenu;
