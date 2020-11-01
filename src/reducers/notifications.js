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
  },
});

export const {
  setNotifications,
  addNotification,
  resetNotifications,
} = notificationsSlice.actions;

export const getNotifications = (state) => state.notifications;

export default notificationsSlice.reducer;
