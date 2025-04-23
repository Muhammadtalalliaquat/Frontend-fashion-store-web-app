import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDiscountProduct,
  orderDiscountProduct,
  updateDicountOrderStatus,
} from "../../server/discountOfferOrderAction";

export const getDiscountOfferOrder = createAsyncThunk("discountOrder/fetch", async () => {
  const response = await fetchDiscountProduct();
  console.log("API Response:", response);
  return response;
});

export const createDiscountOfferOrder = createAsyncThunk("discountOrder/placed", async (orderData) => {
    const response = await orderDiscountProduct(orderData);
    console.log("API Response: discount product order palced", response);
    return response;
  }
);

export const updateDiscountOrder = createAsyncThunk("discountOrder/edit", async ({ id, orderData }) => {
    const response = await updateDicountOrderStatus(id, orderData);
    console.log("API Response: order status updated successfully:", response);
    if (!response) {
      throw new Error("No response from API");
    }
    return response;
  }
);

const discountOrderSlice = createSlice({
  name: "discountOrder",
  initialState: { discountOrder: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDiscountOfferOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDiscountOfferOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getDiscountOfferOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createDiscountOfferOrder.fulfilled, (state, action) => {
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

export default discountOrderSlice.reducer;
