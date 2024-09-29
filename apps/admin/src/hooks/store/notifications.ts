import { create } from 'zustand';

import { getRandomUUID } from '../../utils';
import { NotificationItem } from '../../types';

interface NotificationsStore {
  notifications: NotificationItem[];
  createNotification: (notification: Omit<NotificationItem, 'id'>) => void;
  destroyNotification: (id: string) => void;
  markRead: (id: string) => void;
}

const useNotificationsStore = create<NotificationsStore>((set, getState) => {
  const notifications: NotificationItem[] = [
    {
      id: 'e87e4576-8553-4d81-be07-879c74111ccc',
      title: 'Notification title #1',
      content: 'Notification test message 1',
      isRead: false,
    },
    {
      id: 'fbc29f71-f284-4942-a9ed-7ddfb6d568f0',
      title: 'Notification title #2',
      content: 'Notification test message 2',
      isRead: true,
    },
  ];

  const createNotificationHandler = (toast: Omit<NotificationItem, 'id'>) => {
    const state = getState();
    const newToasts: NotificationItem[] = [...state.notifications];

    newToasts.push({
      id: getRandomUUID(),
      ...toast,
    });

    set({ notifications: newToasts });
  };

  const destroyNotificationHandler = (id: string) => {
    const state = getState();
    const newToasts: NotificationItem[] = [...state.notifications];
    const index = newToasts.findIndex((toast) => toast.id === id);

    if (index > -1) newToasts.splice(index, 1);

    set({ notifications: newToasts });
  };

  const markReadHandler = (id: string) => {
    const state = getState();
    const newToasts: NotificationItem[] = [...state.notifications];
    const index = newToasts.findIndex((toast) => toast.id === id);

    if (index > -1) {
      const obj: NotificationItem = Object.assign(newToasts[index]);

      obj.isRead = true;
      newToasts[index] = obj;
    }

    set({ notifications: newToasts });
  };

  return {
    notifications,
    createNotification: createNotificationHandler,
    destroyNotification: destroyNotificationHandler,
    markRead: markReadHandler,
  };
});

export default useNotificationsStore;
