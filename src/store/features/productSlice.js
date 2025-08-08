import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchHeroProducts,
  fetchProducts,
  fetchAllProducts,
  // fetchOnePageProductsShow,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../server/productAction";


export const getHeroProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetchHeroProducts();
  console.log("API Response:", response);
  return response;
});

export const getAllProducts = createAsyncThunk("products/fetch", async () => {
  const response = await fetchProducts();
  console.log("API Response:", response);
  return response;
});

export const fetchAllProductShow = createAsyncThunk("products/fetch", async () => {
    const response = await fetchAllProducts();
    console.log("API Response:", response);
    return response;
  }
);

// export const getProductsFetchSizeShow = createAsyncThunk(
//   "products/fetch",
//   async () => {
//     const response = await fetchOnePageProductsShow();
//     console.log("API Response:", response);
//     return response;
//   }
// );

export const createProduct = createAsyncThunk("products/add", async (productData) => {
    const response = await addProduct(productData);
    console.log("API Response: Product added:", response);
    return response;
  }
);

export const updateProduct = createAsyncThunk("products/edit", async ({ id, productData }) => {
    const response = await editProduct(id, productData);
    console.log("API Response: Product updated successfully:", response);
    if (!response) {
      throw new Error("No response from API");
    }
    return response;
  }
);

export const removeProduct = createAsyncThunk("products/delete", async (id) => {
  const response = await deleteProduct(id);
  console.log("API Response: Product deleted:", response);

  if (!response) {
    throw new Error("No response from API");
  }
  return id;
});

const productSlice = createSlice({
  name: "product",
  initialState: { products: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (Array.isArray(state.products)) {
          state.products.push(action.payload);
        } else {
          state.products = [action.payload];
        }
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        // state.products = state.products.filter((product) => product._id !== action.payload);
        if (Array.isArray(state.products)) {
          state.products = state.products.filter(
            (product) => product._id !== action.payload
          );
        }
      });
  },
});

export default productSlice.reducer;
