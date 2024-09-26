import { forwardRef, useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PasswordIcon from '@mui/icons-material/Password';

export type PasswordInputProps = TextFieldProps & {
  onVisibilityToggle?: () => void;
  disableIcon?: boolean;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ onVisibilityToggle, disableIcon, ...props }, ref) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const visibleToggle = () => {
      setPasswordVisible(!passwordVisible);
      onVisibilityToggle?.();
    };

    return (
      <TextField
        fullWidth
        ref={ref}
        slotProps={{
          input: {
            startAdornment: !disableIcon && (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="toggle visibility" onClick={visibleToggle}>
                  {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        type={passwordVisible ? 'text' : 'password'}
        {...props}
      />
    );
  }
);

export default PasswordInput;
