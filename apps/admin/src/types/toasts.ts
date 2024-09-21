import { ReactNode } from 'react';
import { AlertProps } from '@mui/material/Alert';

export interface ToastItem {
  id: string;
  message: string;
  action?: ReactNode;
  severity?: AlertProps['severity'];
  autoclose?: number;
}
