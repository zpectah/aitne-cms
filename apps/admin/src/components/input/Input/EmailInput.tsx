import { forwardRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export type EmailInputProps = TextFieldProps & {
  disableIcon?: boolean;
};

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(({ disableIcon, ...props }, ref) => (
  <TextField
    fullWidth
    ref={ref}
    slotProps={{
      input: {
        startAdornment: !disableIcon && (
          <InputAdornment position="start">
            <AlternateEmailIcon />
          </InputAdornment>
        ),
      },
    }}
    type="email"
    {...props}
  />
));

export default EmailInput;
