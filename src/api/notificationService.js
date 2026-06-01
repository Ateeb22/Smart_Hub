// src/api/notificationService.js
import axiosInstance from "./axiosInstance";

export const getNotifications = () => axiosInstance.get("/notifications");
export const markAsRead = (id) =>
  axiosInstance.patch(`/notifications/${id}`, { read: true });
export const markAllAsRead = async () => {
  const { data } = await axiosInstance.get("/notifications");
  const unread = data.filter((n) => !n.read);
  return Promise.all(
    unread.map((n) =>
      axiosInstance.patch(`/notifications/${n.id}`, { read: true }),
    ),
  );
};
