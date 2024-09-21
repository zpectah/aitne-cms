import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useConfirmSore } from '../../hooks';

const ConfirmDialog = () => {
  const { dialogOpen, dialogTitle, dialogDescription, confirmCallback, onClose } = useConfirmSore();

  const confirmHandler = () => {
    onClose();
    confirmCallback();
  };

  return (
    <Dialog fullWidth maxWidth="xs" onClose={onClose} open={dialogOpen}>
      <DialogTitle sx={{ textAlign: 'center' }}>{dialogTitle}</DialogTitle>
      {dialogDescription && <DialogContent sx={{ textAlign: 'center' }}>{dialogDescription}</DialogContent>}
      <DialogActions>
        <Stack alignItems="center" direction="row" gap={1} justifyContent="center" sx={{ width: '100%' }}>
          <Button onClick={confirmHandler}>Confirm</Button>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
