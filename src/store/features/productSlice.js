
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, addProduct, editProduct, deleteProduct } from "../../server/productAction";


export const getAllProducts = createAsyncThunk("products/fetch", async () => {
    const response = await fetchProducts();
    console.log("API Response:", response);
    return response;
});

export const createProduct = createAsyncThunk("products/add", async (productData) => {
    const response = await addProduct(productData);
    console.log("API Response: Product added:", response);
    return response;
});

export const updateProduct = createAsyncThunk("products/edit", async ({ id, productData }) => {
    return await editProduct(id, productData);
});

export const removeProduct = createAsyncThunk("products/delete", async (id) => {
    return await deleteProduct(id);
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
                // state.products = state.products.filter(product => product._id !== action.payload);
                if (Array.isArray(state.products)) {
                    state.products = state.products.filter(product => product._id !== action.payload);
                }
            });
    }
});

export default productSlice.reducer;





