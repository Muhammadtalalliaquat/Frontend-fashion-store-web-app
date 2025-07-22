import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addMulitiOrders,
  fetchChartOrders,
  fetchAllOrders,
  updateOrderStatus,
} from "../../server/multiorderAction";

export const getAllMultiplesOrders = createAsyncThunk("orders/fetch", async () => {
  const response = await fetchAllOrders();
  console.log("API Response:", response);
  return response;
});


export const getAllMultiplesChartOrders = createAsyncThunk("orders/fetch", async () => {
  const response = await fetchChartOrders();
  console.log("API Response:", response);
  return response;
});

export const createMultipleOrders = createAsyncThunk("orders/add", async (orderData) => {
  const response = await addMulitiOrders(orderData);
  console.log("API Response: order placed:", response);
  return response;
});

export const updateOrdersStatus = createAsyncThunk(
  "orders/edit",
  async ({ id, orderData }) => {
    const response = await updateOrderStatus(id, orderData);
    console.log("API Response: order status updated successfully:", response);
    if (!response) {
      throw new Error("No response from API");
    }
    return response;
  }
);

const multipleOrderSlice = createSlice({
  name: "order",
  initialState: { orders: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMultiplesOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMultiplesOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getAllMultiplesOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createMultipleOrders.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products.push(action.payload);
        } else {
          state.products = [action.payload];
        }
      });
    //   .addCase(removeProduct.fulfilled, (state, action) => {
    //     // state.products = state.products.filter((product) => product._id !== action.payload);
    //     if (Array.isArray(state.products)) {
    //       state.products = state.products.filter(
    //         (product) => product._id !== action.payload
    //       );
    //     }
    //   });
  },
});

export default multipleOrderSlice.reducer;
