
import axios from "axios";
import { ApiRoutes } from "../constant/constant";


export const fetchHeroProducts = async () => {
  try {
    const response = await axios.get(`${ApiRoutes.getHeroProducts}`);
    // console.log("Products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch products:",
      error.response?.data || error.message
    );
  }
};

export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${ApiRoutes.getProduct}`);
        // console.log("Products fetched:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products:", error.response?.data || error.message);
    }
};

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${ApiRoutes.getAllProducts}`);
    // console.log("Products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch products:",
      error.response?.data || error.message
    );
  }
};

// export const fetchOnePageProductsShow = async () => {
//   try {
//     const response = await axios.get(
//       `${ApiRoutes.getProductOnePageShow}`
//     );
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Failed to fetch products:",
//       error.response?.data || error.message
//     );
//   }
// };


export const addProduct = async (productData) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token is missing!");
            return;
        }

        console.log("Token before sending request:", token);

        const response = await axios.post(ApiRoutes.addProduct, productData, {
            headers: { 
                Authorization: `Bearer ${token}`
            },
        });
        // console.log("API Response: Product added:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to add product:", error.response?.data || error.message);
    }
};

export const editProduct = async (id, productData) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token is missing!");
          return;
        }

        const response = await axios.put(`${ApiRoutes.editProduct}/${id}`, productData ,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Product updated:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to edit product:", error.response?.data || error.message);
    }
};

export const deleteProduct = async (id) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token is missing!");
            return;
        }
        const response = await axios.delete(`${ApiRoutes.deleteProduct}/${id}` , {
            headers: { 
                Authorization: `Bearer ${token}`
            },
        });
        console.log("Product deleted:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to delete product:", error.response?.data || error.message);
        throw error;
    }
};
