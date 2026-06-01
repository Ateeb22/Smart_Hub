// src/features/users/userSelectors.js
export const selectUsers = (state) => state.users.items;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;
export const selectUsersActionLoading = (state) => state.users.actionLoading;
