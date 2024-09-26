import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import Button, { ButtonProps } from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface NewButtonLinkProps extends ButtonProps {
  to: string;
}

const NewButtonLink = forwardRef<HTMLButtonElement, NewButtonLinkProps>(({ children, to, ...rest }, ref) => (
  <Button color="success" component={Link} ref={ref} startIcon={<AddIcon />} to={to} {...rest}>
    {children}
  </Button>
));

export default NewButtonLink;
