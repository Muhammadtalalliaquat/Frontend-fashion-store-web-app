import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchOrder,
  fetchChartOrder,
  addOrder,
  updateOrderStatus,
} from "../../server/orderAction";

export const getAllOrders = createAsyncThunk("orders/fetch", async () => {
  const response = await fetchOrder();
  console.log("API Response:", response);
  return response;
});

export const getAllChartOrders = createAsyncThunk("orders/fetch", async () => {
  const response = await fetchChartOrder();
  console.log("API Response:", response);
  return response;
});

export const createOrder = createAsyncThunk("orders/add", async (orderData) => {
  const response = await addOrder(orderData);
  console.log("API Response: order placed:", response);
  return response;
});

export const updateOrder = createAsyncThunk("orders/edit", async ({ id, orderData }) => {
    const response = await updateOrderStatus(id, orderData);
    console.log("API Response: order status updated successfully:", response);
    if (!response) {
      throw new Error("No response from API");
    }
    return response;
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState: { orders: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products.push(action.payload);
        } else {
          state.products = [action.payload];
        }
      })
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

export default orderSlice.reducer;
