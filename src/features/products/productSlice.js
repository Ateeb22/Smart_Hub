// src/features/products/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productService";

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getProducts();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (productData, { rejectWithValue }) => {
    try {
      const newProduct = {
        ...productData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      const { data } = await createProduct(newProduct);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const { data } = await updateProduct(id, productData);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const removeProduct = createAsyncThunk(
  "products/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    actionLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(editProduct.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editProduct.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(removeProduct.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(removeProduct.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export default productSlice.reducer;
