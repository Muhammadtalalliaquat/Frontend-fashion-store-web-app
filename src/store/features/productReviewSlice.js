import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchReviews,
  addReviews,
  deleteReviews,
} from "../../server/productReviewAction";

export const getAllReview = createAsyncThunk("reviews/fetch", async (id) => {
  const response = await fetchReviews(id);
  console.log("API Response here :", response.data);
  return response;
});


export const addProductReview = createAsyncThunk("reviews/add", async (productReviewData) => {
    const response = await addReviews(productReviewData);
    console.log("API Response: Product reviews add successfully:", response);
    return response;
  }
);


export const removeReviews = createAsyncThunk("reviews/delete", async (id) => {
  const response = await deleteReviews(id);
  console.log("API Response: Product reviews deleted:", response);

  if (!response) {
    throw new Error("No response from API");
  }
  return id;
});


const productReviewSlice = createSlice({
  name: "reviews",
  initialState: { reviews: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllReview.fulfilled, (state, action) => {
        state.status = "success";
        state.cart = action.payload;
      })
      .addCase(getAllReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        if (Array.isArray(state.reviews)) {
          state.reviews.push(action.payload);
        } else {
          state.reviews = [action.payload];
        }
        // state.status = "success";
        // state.reviews.push(action.payload);
      })
      .addCase(removeReviews.fulfilled, (state, action) => {
        if (Array.isArray(state.reviews)) {
          state.reviews = state.reviews.filter(
            (product) => product._id !== action.payload
          );
        }
      });
  },
});

export default productReviewSlice.reducer;