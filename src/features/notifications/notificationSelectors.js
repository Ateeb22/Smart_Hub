// src/features/notifications/notificationSelectors.js
export const selectNotifications = (state) => state.notifications.items;
export const selectUnreadCount = (state) =>
  state.notifications.items.filter((n) => !n.read).length;
export const selectNotificationsLoading = (state) =>
  state.notifications.loading;
