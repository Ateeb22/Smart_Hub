// src/features/orders/orderSelectors.js
export const selectOrders = (state) => state.orders.items;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;
export const selectOrdersActionLoading = (state) => state.orders.actionLoading;
