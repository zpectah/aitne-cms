import { MouseEvent, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { styled } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useLayoutStore, useBreakpoint } from '../../../hooks';

const NavigationItem = styled(ListItem)(() => ({}));

interface SidebarNavigationItemProps extends LinkProps {
  mobileCallback?: () => void;
  icon?: ReactNode;
  selected?: boolean;
}

const SidebarNavigationItem = ({
  children,
  mobileCallback,
  onClick,
  icon,
  selected,
  ...rest
}: SidebarNavigationItemProps) => {
  const { sidebarClose } = useLayoutStore();
  const { isMobile } = useBreakpoint();

  const clickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (isMobile) {
      sidebarClose();
      mobileCallback?.();
    }
  };

  return (
    <NavigationItem disablePadding>
      <ListItemButton component={Link} onClick={clickHandler} selected={selected} {...rest}>
        {icon && <ListItemIcon sx={{ minWidth: '2.75rem' }}>{icon}</ListItemIcon>}
        <ListItemText disableTypography primary={children} sx={{ fontWeight: 600 }} />
      </ListItemButton>
    </NavigationItem>
  );
};

export default SidebarNavigationItem;
