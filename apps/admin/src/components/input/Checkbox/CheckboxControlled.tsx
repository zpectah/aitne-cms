import { forwardRef } from 'react';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

export interface CheckboxControlledProps extends Omit<FormControlLabelProps, 'control'> {
  checkboxProps?: Partial<CheckboxProps>;
  defaultChecked?: boolean;
}

const CheckboxControlled = forwardRef<HTMLInputElement, CheckboxControlledProps>(
  ({ checkboxProps, defaultChecked, ...rest }, ref) => (
    <FormControlLabel control={<Checkbox defaultChecked={defaultChecked} {...checkboxProps} />} ref={ref} {...rest} />
  )
);

export default CheckboxControlled;
