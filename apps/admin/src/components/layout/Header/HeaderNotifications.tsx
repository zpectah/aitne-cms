import { useState, MouseEvent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useNotificationsStore } from '../../../hooks';

const HeaderNotifications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { notifications, markRead } = useNotificationsStore();
  const { t } = useTranslation();
  const openHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const closeHandler = () => setAnchorEl(null);
  const unreadNotifications = useMemo(() => notifications.filter((not) => !not.isRead), [notifications]);

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
        {notifications.map((not) => (
          <MenuItem divider key={not.id}>
            <Stack gap={2}>
              <Stack gap={1}>
                <Typography variant="body1">{not.title}</Typography>
                <Typography variant="body2">{not.content}</Typography>
              </Stack>
              {!not.isRead && (
                <Button
                  onClick={() => {
                    markRead(not.id);
                    closeHandler();
                  }}
                  size="small"
                >
                  {t('btn.dismiss')}
                </Button>
              )}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </Badge>
  );
};

export default HeaderNotifications;
