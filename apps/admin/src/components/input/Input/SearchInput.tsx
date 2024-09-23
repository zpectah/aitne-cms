import { forwardRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export type SearchInputProps = TextFieldProps & {};

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => (
  <TextField fullWidth ref={ref} type="search" {...props} />
));

export default SearchInput;
