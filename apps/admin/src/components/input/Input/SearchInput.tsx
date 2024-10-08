import { forwardRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export type SearchInputProps = TextFieldProps & {
  disableIcon?: boolean;
};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(({ disableIcon, ...props }, ref) => (
  <TextField
    fullWidth
    ref={ref}
    slotProps={{
      input: {
        startAdornment: !disableIcon && (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      },
    }}
    type="search"
    {...props}
  />
));

export default SearchInput;
