// src/stores/notificationStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  autoClose?: boolean;
  duration?: number;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools((set, get) => ({
    notifications: [],

    addNotification: (notification) => {
      const id = uuidv4();
      const fullNotification: Notification = {
        id,
        read: false,
        createdAt: new Date(),
        ...notification,
      };

      set((state) => ({
        notifications: [fullNotification, ...state.notifications],
      }));

      // Auto close notification if specified
      if (notification.autoClose !== false) {
        const duration = notification.duration || 5000; // Default 5 seconds
        setTimeout(() => {
          get().removeNotification(id);
        }, duration);
      }

      return id;
    },

    removeNotification: (id) => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    },

    clearNotifications: () => {
      set({ notifications: [] });
    },

    markAsRead: (id) => {
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      }));
    },

    markAllAsRead: () => {
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }));
    },
  }))
);