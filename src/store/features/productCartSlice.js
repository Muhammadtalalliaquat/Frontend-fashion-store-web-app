import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCart,
  addCart,
  deleteProductCart,
  editProductCart,
} from "../../server/productCartAction";

export const getAllCart = createAsyncThunk("carts/fetch", async () => {
  const response = await fetchCart();
  console.log("API Response here :", response.data);
  return response;
});

export const addCartItem = createAsyncThunk("carts/add", async (productCartData) => {
    const response = await addCart(productCartData);
    console.log("API Response: Product add in cart item successfully:", response);
    return response;
});


export const removeCartItem = createAsyncThunk("carts/delete", async (id) => {
  const response = await deleteProductCart(id);
  console.log("API Response: Product Cart deleted:", response);

  if (!response) {
    throw new Error("No response from API");
  }
  return id;
});


export const updateProductCart = createAsyncThunk("carts/edit", async ({ productId, cartData }) => {
    const response = await editProductCart(productId, cartData);
    console.log("API Response: Product Cart updated successfully:", response);
    if (!response) {
      throw new Error("No response from API");
    }
    return response;
  }
);


const productCartSlice = createSlice({
  name: "cart",
  initialState: { cart: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.status = "success";
        state.cart = action.payload;
      })
      .addCase(getAllCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        if (Array.isArray(state.cart)) {
          state.cart.push(action.payload);
        } else {
          state.cart = [action.payload];
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        if (Array.isArray(state.cart)) {
          state.cart = state.cart.filter(
            (product) => product._id !== action.payload
          );
        }
      });
  },
});

export default productCartSlice.reducer;