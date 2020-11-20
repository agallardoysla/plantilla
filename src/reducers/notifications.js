import {createSlice} from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    setNotifications: (notifications, action) => {
      notifications = action.payload;
      return notifications;
    },
    addNotification: (notifications, action) => {
      notifications = [...notifications, action.payload];
      return notifications;
    },
    resetNotifications: (notifications) => {
      notifications = [];
      return notifications;
    },
    readNotification: (notifications, action) => {
      notifications = notifications.map((notification) => {
        notification.is_read = notification.is_read || action.notificationId === notification.id;
        return notification;
      });
      return notifications;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  resetNotifications,
} = notificationsSlice.actions;

export const getNotifications = (state) => state.notifications;

export default notificationsSlice.reducer;
