// src/features/users/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/userService";

// Async Thunks
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getUsers();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addUser = createAsyncThunk(
  "users/add",
  async (userData, { rejectWithValue }) => {
    try {
      const newUser = {
        ...userData,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`,
        createdAt: new Date().toISOString().split("T")[0],
      };
      const { data } = await createUser(newUser);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const editUser = createAsyncThunk(
  "users/edit",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const { data } = await updateUser(id, userData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const removeUser = createAsyncThunk(
  "users/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteUser(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    loading: false,
    error: null,
    actionLoading: false, // for create/update/delete operations
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addUser.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addUser.rejected, (state) => {
        state.actionLoading = false;
      })
      // Edit
      .addCase(editUser.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editUser.rejected, (state) => {
        state.actionLoading = false;
      })
      // Remove
      .addCase(removeUser.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter((u) => u.id !== action.payload);
      })
      .addCase(removeUser.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export default userSlice.reducer;
