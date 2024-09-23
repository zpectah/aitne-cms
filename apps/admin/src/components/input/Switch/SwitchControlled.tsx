import { forwardRef } from 'react';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';

export interface SwitchControlledProps extends Omit<FormControlLabelProps, 'control'> {
  switchProps?: Partial<SwitchProps>;
  defaultChecked?: boolean;
}

const CheckboxControlled = forwardRef<HTMLInputElement, SwitchControlledProps>(
  ({ switchProps, defaultChecked, ...rest }, ref) => (
    <FormControlLabel control={<Switch defaultChecked={defaultChecked} {...switchProps} />} ref={ref} {...rest} />
  )
);

export default CheckboxControlled;
