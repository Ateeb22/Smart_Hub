// src/api/orderService.js
import axiosInstance from "./axiosInstance";

export const getOrders = () => axiosInstance.get("/orders");
export const getOrderById = (id) => axiosInstance.get(`/orders/${id}`);
export const updateOrder = (id, data) =>
  axiosInstance.put(`/orders/${id}`, data);
export const deleteOrder = (id) => axiosInstance.delete(`/orders/${id}`);
