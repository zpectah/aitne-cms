import { styled } from '@mui/material';

import { HEADER_DESKTOP_HEIGHT } from '../../../styles';

const HeaderWrapper = styled('header')(() => ({
  width: '100%',
  height: HEADER_DESKTOP_HEIGHT,
  flex: '0 0 auto',
  position: 'sticky',
  top: 0,
}));

const Header = () => <HeaderWrapper>...Header...</HeaderWrapper>;

export default Header;
