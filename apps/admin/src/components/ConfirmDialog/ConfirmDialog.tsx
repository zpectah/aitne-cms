import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useConfirmSore } from '../../hooks';

const ConfirmDialog = () => {
  const { dialogOpen, dialogTitle, dialogDescription, confirmCallback, onClose } = useConfirmSore();

  const confirmHandler = () => {
    onClose();
    confirmCallback();
  };

  // TODO

  return (
    <Dialog onClose={onClose} open={dialogOpen}>
      <DialogTitle>DialogTitle...{dialogTitle}</DialogTitle>
      {dialogDescription && <DialogContent>{dialogDescription}</DialogContent>}
      <DialogActions>
        DialogActions...<button onClick={confirmHandler}>confirmation button</button>...
        <button onClick={onClose}>cancel</button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
