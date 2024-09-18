import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

export interface CheckboxControlledProps extends Omit<FormControlLabelProps, 'control'> {
  checkboxProps?: Partial<CheckboxProps>;
  defaultChecked?: boolean;
}

const CheckboxControlled = ({ checkboxProps, defaultChecked, ...rest }: CheckboxControlledProps) => (
  <FormControlLabel control={<Checkbox defaultChecked={defaultChecked} {...checkboxProps} />} {...rest} />
);

export default CheckboxControlled;
