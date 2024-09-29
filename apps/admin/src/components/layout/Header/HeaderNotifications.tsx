import { useState, MouseEvent, useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { useNotificationsStore } from '../../../hooks';

const HeaderNotifications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { notifications } = useNotificationsStore();
  const openHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const closeHandler = () => setAnchorEl(null);
  const unreadNotifications = useMemo(() => notifications.filter((notif) => !notif.isRead), [notifications]);

  return (
    <Badge badgeContent={unreadNotifications.length} color="primary">
      <IconButton
        aria-controls={open ? 'header-notifications' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        id="header-notifications-trigger"
        onClick={openHandler}
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
        {notifications.map((notif) => (
          <MenuItem key={notif.id}>
            <span>
              <span>{notif.title}</span>
              <span>{notif.content}</span>
              <button onClick={closeHandler}>ok</button>
            </span>
          </MenuItem>
        ))}
      </Menu>
    </Badge>
  );
};

export default HeaderNotifications;
