import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const HeaderUser = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? 'header-user' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        id="header-user-trigger"
        onClick={clickHandler}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'header-user-trigger',
        }}
        anchorEl={anchorEl}
        id="header-user"
        onClose={closeHandler}
        open={open}
      >
        <MenuItem onClick={closeHandler}>Profile</MenuItem>
        <MenuItem onClick={closeHandler}>My account</MenuItem>
        <MenuItem onClick={closeHandler}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderUser;
