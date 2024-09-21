import { useEffect } from 'react';
import { styled } from '@mui/material';
import Alert, { AlertProps } from '@mui/material/Alert';

import { ToastItem } from '../../types';
import { useToastsStore } from '../../hooks';

const ToastsLayerWrapper = styled('div')({
  width: '100%',
  height: 0,
  position: 'fixed',
  top: 0,
  left: 0,
  overflow: 'visible',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  flexDirection: 'row',
});

const ToastsWrapper = styled('div')({
  width: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 5,

  '& > *:first-of-type': {
    marginTop: '.5rem',
  },
});

interface ToastProps extends ToastItem {
  onClose: () => void;
  alertProps?: Partial<Omit<AlertProps, 'action' | 'onClose' | 'children'>>;
}

const Toast = ({ id, message, onClose, action, alertProps, severity = 'info', autoclose }: ToastProps) => {
  useEffect(() => {
    if (autoclose)
      setTimeout(() => {
        onClose();
      }, autoclose);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Alert
      action={action}
      id={id}
      onClose={onClose}
      severity={severity}
      sx={{
        width: {
          xs: 'calc(100vw - 1rem)',
          md: '33vw',
          lg: '300px',
        },
      }}
      variant="filled"
      {...alertProps}
    >
      {message}
    </Alert>
  );
};

const Toasts = () => {
  const { toasts, destroyToast } = useToastsStore();

  const closeHandler = (id: string) => {
    destroyToast(id);
  };

  return (
    <ToastsLayerWrapper>
      <ToastsWrapper>
        {toasts.map(({ id, ...rest }) => (
          <Toast id={id} key={id} onClose={() => closeHandler(id)} {...rest} />
        ))}
      </ToastsWrapper>
    </ToastsLayerWrapper>
  );
};

export default Toasts;
