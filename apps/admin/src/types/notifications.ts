import { ReactNode } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  content: ReactNode;
  isRead: boolean;
}
