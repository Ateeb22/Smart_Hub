// src/api/dashboardService.js
import axiosInstance from "./axiosInstance";

export const getStats = () => axiosInstance.get("/stats");
export const getMonthlySales = () => axiosInstance.get("/monthlySales");
export const getCategoryStats = () => axiosInstance.get("/categoryStats");
