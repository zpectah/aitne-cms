import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { WithChildren } from '@common';

export interface FormFieldProps extends WithChildren {
  label?: string;
  required?: boolean;
  fieldError?: FieldError;
  messages?: {
    help?: string[];
    success?: string[];
    error?: string[];
  };
}

const FormField = ({ label, children, required, fieldError, messages }: FormFieldProps) => {
  const { t } = useTranslation(['form']);

  const renderMessages = () => {
    if (!(messages?.help || messages?.success || messages?.error || fieldError?.type)) {
      return null;
    }

    return (
      <Stack direction="column">
        {fieldError?.type === 'required' && <FormHelperText error>{t('form:msg.error.required')}</FormHelperText>}
        {fieldError?.type === 'minLength' && <FormHelperText error>{t('form:msg.error.minLength')}</FormHelperText>}
        {fieldError?.type === 'min' && <FormHelperText error>{t('form:msg.error.min')}</FormHelperText>}
        {fieldError?.type === 'max' && <FormHelperText error>{t('form:msg.error.max')}</FormHelperText>}
        {messages?.help?.map((msg) => (
          <FormHelperText key={msg}>{msg}</FormHelperText>
        ))}
        {messages?.success?.map((msg) => (
          <FormHelperText key={msg} sx={{ color: ({ palette }) => palette.success.main }}>
            {msg}
          </FormHelperText>
        ))}
        {messages?.error?.map((msg) => (
          <FormHelperText error key={msg}>
            {msg}
          </FormHelperText>
        ))}
      </Stack>
    );
  };

  return (
    <Stack direction="column" gap={1}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <Stack>{children}</Stack>
      {renderMessages()}
    </Stack>
  );
};

export default FormField;
