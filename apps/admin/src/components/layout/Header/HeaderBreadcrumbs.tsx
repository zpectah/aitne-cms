import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { useBreakpoint } from '../../../hooks';

const HeaderBreadcrumbs = () => {
  const { isDesktop } = useBreakpoint();

  if (isDesktop)
    return (
      <Breadcrumbs>
        <Typography>AitneCMS</Typography>
        <Typography>en</Typography>
        <Typography>:page</Typography>
      </Breadcrumbs>
    );
};

export default HeaderBreadcrumbs;
