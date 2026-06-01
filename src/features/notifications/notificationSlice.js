// src/features/notifications/notificationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../../api/notificationService";

// Async thunks
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getNotifications();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markRead",
  async (id, { rejectWithValue }) => {
    try {
      await markAsRead(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const markAllNotificationsRead = createAsyncThunk(
  "notifications/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      await markAllAsRead();
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // mark one as read
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const notification = state.items.find((n) => n.id === action.payload);
        if (notification) notification.read = true;
      })
      // mark all as read
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.items.forEach((n) => {
          n.read = true;
        });
      });
  },
});

export default notificationSlice.reducer;
