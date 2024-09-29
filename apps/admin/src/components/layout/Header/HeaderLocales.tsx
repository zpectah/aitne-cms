import { useState, MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import config from '../../../../config';
import { useLocales } from '../../../hooks';
import { locales } from '../../../constants';

const HeaderLocales = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { locale, setLocales } = useLocales();
  const openHandler = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const closeHandler = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        aria-controls={open ? 'header-locales' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        id="header-locales-trigger"
        onClick={openHandler}
      >
        <Typography sx={{ textTransform: 'uppercase' }}>{locale}</Typography>
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'header-locales-trigger',
        }}
        anchorEl={anchorEl}
        id="header-locales"
        onClose={closeHandler}
        open={open}
      >
        {config.locales.supported.map((lang) => (
          <MenuItem
            key={lang}
            onClick={() => {
              setLocales(lang);
              closeHandler();
            }}
            selected={locale === lang}
          >
            {locales[lang].label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default HeaderLocales;
