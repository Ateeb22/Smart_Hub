// src/features/orders/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, updateOrder, deleteOrder } from "../../api/orderService";

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getOrders();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// export const updateOrderStatus = createAsyncThunk(
//   "orders/updateStatus",
//   async ({ id, status }, { rejectWithValue }) => {
//     try {
//       const { data } = await updateOrder(id, { status });
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   },
// );
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, { rejectWithValue, getState }) => {
    try {
      // Get the full existing order from Redux state
      const existingOrder = getState().orders.items.find((o) => o.id === id);

      // Merge full order with new status — never lose any fields
      const updatedOrder = { ...existingOrder, status };

      const { data } = await updateOrder(id, updatedOrder);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const removeOrder = createAsyncThunk(
  "orders/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteOrder(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
    actionLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.items.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(removeOrder.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter((o) => o.id !== action.payload);
      })
      .addCase(removeOrder.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export default orderSlice.reducer;
