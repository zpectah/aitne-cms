import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { WithChildren } from '@common';

interface ButtonLinkProps extends WithChildren {
  path: string;
}

const ButtonLink = ({ children, path }: ButtonLinkProps) => (
  <Typography component={Link} sx={{ textDecoration: 'none', color: 'inherit' }} to={path} variant="button">
    {children}
  </Typography>
);

export default ButtonLink;
