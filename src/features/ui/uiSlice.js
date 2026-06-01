// src/features/ui/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  activeModal: null, // 'createUser' | 'editUser' | 'deleteUser' | null
  modalData: null, // data passed into the modal
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal(state, action) {
      state.activeModal = action.payload.modal;
      state.modalData = action.payload.data || null;
    },
    closeModal(state) {
      state.activeModal = null;
      state.modalData = null;
    },
  },
});

export const { toggleSidebar, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
