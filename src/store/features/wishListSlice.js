import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWishList,
  addWishList,
  deleteWishList,
} from "../../server/wishlistAction";

export const getAllWishList = createAsyncThunk("wishlist/fetch", async () => {
  const response = await fetchWishList();
  console.log("API Response here :", response.data);
  return response;
});

export const addWishListItem = createAsyncThunk(
  "wishlist/add",
  async (productCartData) => {
    const response = await addWishList(productCartData);
    console.log(
      "API Response: Product added to wishlist successfully:",
      response
    );
    return response;
  }
);

export const removeWishListItem = createAsyncThunk("wishlist/delete", async (id) => {
  const response = await deleteWishList(id);
  console.log("API Response: Product deleted to wishlist successfully:", response);

  if (!response) {
    throw new Error("No response from API");
  }
  return id;
});



const productWishListSlice = createSlice({
  name: "wishlist",
  initialState: { wishlist: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllWishList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllWishList.fulfilled, (state, action) => {
        state.status = "success";
        state.wishlist = action.payload;
      })
      .addCase(getAllWishList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addWishListItem.fulfilled, (state, action) => {
        if (Array.isArray(state.wishlist)) {
          state.wishlist.push(action.payload);
        } else {
          state.wishlist = [action.payload];
        }
      })
      .addCase(removeWishListItem.fulfilled, (state, action) => {
        if (Array.isArray(state.wishlist)) {
          state.wishlist = state.wishlist.filter(
            (product) => product._id !== action.payload
          );
        }
      });
  },
});

export default productWishListSlice.reducer;