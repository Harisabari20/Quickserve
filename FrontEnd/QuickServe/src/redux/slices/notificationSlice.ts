import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [
    {
      id: 'n1',
      title: 'Booking Confirmed',
      message: 'Your AC Service booking #QS1024 has been confirmed.',
      time: '2 min ago',
      read: false,
    },
    {
      id: 'n2',
      title: 'Provider Assigned',
      message: 'Ramesh has been assigned to your booking.',
      time: '15 min ago',
      read: false,
    },
  ],
  unreadCount: 2,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((item) => !item.read).length;
    },
    markAllNotificationsRead: (state) => {
      state.notifications = state.notifications.map((item) => ({ ...item, read: true }));
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, markAllNotificationsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
