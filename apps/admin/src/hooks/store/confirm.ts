import { create } from 'zustand';

import { DIALOG_TRANSITION_DELAY } from '../../styles';

interface ConfirmStore {
  dialogOpen: boolean;
  dialogTitle: string | undefined;
  dialogDescription: string | undefined;
  confirmCallback: () => void;
  onOpen: (callback: () => void, title: string, description?: string) => void;
  onClose: () => void;
}

const useConfirmSore = create<ConfirmStore>((set) => {
  const openHandler = (callback: () => void, title: string, description?: string) => {
    set({ dialogOpen: true, dialogTitle: title, dialogDescription: description, confirmCallback: callback });
  };

  const closeHandler = () => {
    set({ dialogOpen: false });
    setTimeout(() => {
      set({ dialogTitle: undefined, dialogDescription: undefined, confirmCallback: () => {} });
    }, DIALOG_TRANSITION_DELAY);
  };

  return {
    dialogOpen: false,
    dialogTitle: undefined,
    dialogDescription: undefined,
    confirmCallback: () => {},
    onOpen: openHandler,
    onClose: closeHandler,
  };
});

export default useConfirmSore;
