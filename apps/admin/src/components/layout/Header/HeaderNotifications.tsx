import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

const HeaderNotifications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  return (
    <Badge badgeContent={1} color="primary">
      <IconButton
        aria-controls={open ? 'header-notifications' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        id="header-notifications-trigger"
        onClick={clickHandler}
      >
        <NotificationsIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'header-notifications-trigger',
        }}
        anchorEl={anchorEl}
        id="header-notifications"
        onClose={closeHandler}
        open={open}
      >
        <MenuItem>
          <span>
            <span>some title</span>
            <button onClick={closeHandler}>ok</button>
          </span>
        </MenuItem>
      </Menu>
    </Badge>
  );
};

export default HeaderNotifications;
