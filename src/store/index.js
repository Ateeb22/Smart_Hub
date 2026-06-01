// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/ui/uiSlice";
import notificationReducer from "../features/notifications/notificationSlice";
import userReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";
import orderReducer from "../features/orders/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    notifications: notificationReducer,
    users: userReducer,
    products: productReducer,
    orders: orderReducer,
  },
});

export default store;
