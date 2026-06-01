// src/features/products/productSelectors.js
export const selectProducts = (state) => state.products.items;
export const selectProductsLoading = (state) => state.products.loading;
export const selectProductsError = (state) => state.products.error;
export const selectProductsActionLoading = (state) =>
  state.products.actionLoading;
