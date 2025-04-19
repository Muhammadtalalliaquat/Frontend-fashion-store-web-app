import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDiscount,
  addDiscount,
  updateDiscount,
} from "../../server/discountOfferAction";

export const getDiscountOffer = createAsyncThunk("discount/fetch", async () => {
  const response = await fetchDiscount();
  console.log("API Response:", response);
  return response;
});

export const createDiscountOffer = createAsyncThunk("discount/add", async (orderData) => {
    const response = await addDiscount(orderData);
    console.log("API Response: order discount add", response);
    return response;
  }
);

export const updateOrder = createAsyncThunk("discount/edit", async ({ id, orderData }) => {
    const response = await updateDiscount(id, orderData);
    console.log("API Response: update Discount offer successfully:", response);
    if (!response) {
      throw new Error("No response from API");
    }
    return response;
  }
);

const discountSlice = createSlice({
  name: "discount",
  initialState: { discount: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDiscountOffer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDiscountOffer.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getDiscountOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createDiscountOffer.fulfilled, (state, action) => {
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

export default discountSlice.reducer;
