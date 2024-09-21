import { create } from 'zustand';

import { getRandomUUID } from '../../utils';
import { ToastItem } from '../../types';

interface ToastsStore {
  toasts: ToastItem[];
  createToast: (toast: Omit<ToastItem, 'id'>) => void;
  destroyToast: (id: string) => void;
}

const useToastsStore = create<ToastsStore>((set, getState) => {
  const toasts: ToastItem[] = [];

  const createToastHandler = (toast: Omit<ToastItem, 'id'>) => {
    const s = getState();
    const newToasts: ToastItem[] = [...s.toasts];

    newToasts.push({
      id: getRandomUUID(),
      ...toast,
    });

    set({ toasts: newToasts });
  };

  const destroyToastHandler = (id: string) => {
    const s = getState();
    const newToasts: ToastItem[] = [...s.toasts];
    const index = newToasts.findIndex((toast) => toast.id === id);

    if (index > -1) newToasts.splice(index, 1);

    set({ toasts: newToasts });
  };

  return {
    toasts,
    createToast: createToastHandler,
    destroyToast: destroyToastHandler,
  };
});

export default useToastsStore;
