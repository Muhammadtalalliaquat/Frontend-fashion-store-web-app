import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addMulitiOrders } from "../../server/multiorderAction";

// export const getAllOrders = createAsyncThunk("orders/fetch", async () => {
//   const response = await fetchOrder();
//   console.log("API Response:", response);
//   return response;
// });

export const createMultipleOrders = createAsyncThunk("orders/add", async (orderData) => {
  const response = await addMulitiOrders(orderData);
  console.log("API Response: order placed:", response);
  return response;
});

// export const updateOrder = createAsyncThunk(
//   "orders/edit",
//   async ({ id, orderData }) => {
//     const response = await updateOrderStatus(id, orderData);
//     console.log("API Response: order status updated successfully:", response);
//     if (!response) {
//       throw new Error("No response from API");
//     }
//     return response;
//   }
// );

const multipleOrderSlice = createSlice({
  name: "order",
  initialState: { orders: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   .addCase(getAllOrders.pending, (state) => {
      //     state.status = "loading";
      //   })
      //   .addCase(getAllOrders.fulfilled, (state, action) => {
      //     state.status = "success";
      //     state.products = action.payload;
      //   })
      //   .addCase(getAllOrders.rejected, (state, action) => {
      //     state.status = "failed";
      //     state.error = action.payload;
      //   })
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
