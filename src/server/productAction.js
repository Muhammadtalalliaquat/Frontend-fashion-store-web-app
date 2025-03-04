
import axios from "axios";
import { ApiRoutes } from "../constant/constant";

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(ApiRoutes.getProduct);
        console.log("Products fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products:", error.response?.data || error.message);
    }
};

// Add a new product
export const addProduct = async (productData) => {
    try {
        const response = await axios.post(ApiRoutes.addProduct, productData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Product added:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to add product:", error.response?.data || error.message);
    }
};

// Edit a product
export const editProduct = async (id, productData) => {
    try {
        const response = await axios.put(`${ApiRoutes.editProduct}/${id}`, productData);
        console.log("Product updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to edit product:", error.response?.data || error.message);
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${ApiRoutes.deleteProduct}/${id}`);
        console.log("Product deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to delete product:", error.response?.data || error.message);
    }
};
