import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';

export interface SwitchControlledProps extends Omit<FormControlLabelProps, 'control'> {
  switchProps?: Partial<SwitchProps>;
  defaultChecked?: boolean;
}

const CheckboxControlled = ({ switchProps, defaultChecked, ...rest }: SwitchControlledProps) => (
  <FormControlLabel control={<Switch defaultChecked={defaultChecked} {...switchProps} />} {...rest} />
);

export default CheckboxControlled;
