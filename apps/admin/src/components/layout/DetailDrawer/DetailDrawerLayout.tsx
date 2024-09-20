import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { WithChildren } from '@common';
import { HEADER_DESKTOP_HEIGHT } from '../../../styles';
import { Form, FormProps } from '../../form';

const DetailDrawerLayoutForm = styled(Form)({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const DetailDrawerLayoutHeading = styled('div')(({ theme }) => ({
  width: '100%',
  height: HEADER_DESKTOP_HEIGHT,
  flex: '0 0 auto',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const DetailDrawerLayoutInner = styled('div')(({ theme }) => ({
  width: '100%',
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const DetailDrawerLayoutContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    flex: '1 1 auto',
    flexGrow: 1,
    overflowY: 'auto',
  },
}));

const DetailDrawerLayoutContentScrollable = styled('div')(({ theme }) => ({
  padding: '1rem',

  [theme.breakpoints.up('md')]: {
    overflowY: 'auto',
  },
}));

const DetailDrawerLayoutSidebar = styled('div')(({ theme }) => ({
  width: '100%',
  flex: '0 0 auto',
  padding: '1rem',

  [theme.breakpoints.up('md')]: {
    width: '250px',
    overflowY: 'auto',
    borderLeft: `1px solid ${theme.palette.divider}`,
  },
}));

const DetailDrawerLayoutFooter = styled('div')(({ theme }) => ({
  width: '100%',
  flex: '0 0 auto',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

interface DetailDrawerLayoutProps extends WithChildren {
  rootPath: string;
  title: ReactNode;
  sidebar?: ReactNode;
  headerSlot?: ReactNode;
  footer?: ReactNode;
  formProps?: Partial<FormProps>;
  isLoading?: boolean;
}

const DetailDrawerLayout = ({
  children,
  rootPath,
  title,
  sidebar,
  headerSlot,
  footer,
  formProps,
  isLoading,
}: DetailDrawerLayoutProps) => {
  const navigate = useNavigate();
  const closeHandler = () => navigate(rootPath);

  if (isLoading) return <div>Loading...</div>;

  return (
    <DetailDrawerLayoutForm {...formProps}>
      <DetailDrawerLayoutHeading>
        <Typography variant="h3">{title}</Typography>
        <Stack>
          {headerSlot}
          <IconButton onClick={closeHandler}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DetailDrawerLayoutHeading>
      <DetailDrawerLayoutInner>
        <DetailDrawerLayoutContent>
          <DetailDrawerLayoutContentScrollable>{children}</DetailDrawerLayoutContentScrollable>
        </DetailDrawerLayoutContent>
        {sidebar && <DetailDrawerLayoutSidebar>{sidebar}</DetailDrawerLayoutSidebar>}
      </DetailDrawerLayoutInner>
      {footer && <DetailDrawerLayoutFooter>{footer}</DetailDrawerLayoutFooter>}
    </DetailDrawerLayoutForm>
  );
};

export default DetailDrawerLayout;
