import { styled } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { useLayoutStore } from '../../../hooks';
import { HEADER_DESKTOP_HEIGHT } from '../../../styles';

const HeaderWrapper = styled('header')(({ theme }) => ({
  width: '100%',
  flex: '0 0 auto',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backgroundColor: theme.palette.background.default,
}));

const HeaderContent = styled('div')(() => ({
  width: '100%',
  height: HEADER_DESKTOP_HEIGHT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Header = () => {
  const { sidebarOpen, sidebarToggle } = useLayoutStore();

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <Stack direction="row" gap={1}>
            {!sidebarOpen && (
              <Button onClick={sidebarToggle} size="small" variant="outlined">
                menu
              </Button>
            )}
            <div>Some title or whatever ...</div>
          </Stack>
          <Stack direction="row" gap={1}>
            <Button size="small" variant="outlined">
              search
            </Button>
            <Button size="small" variant="outlined">
              notification
            </Button>
            <Button size="small" variant="outlined">
              user
            </Button>
          </Stack>
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
