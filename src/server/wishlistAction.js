import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const fetchWishList = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.get(`${ApiRoutes.getWishList}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch cart product:",
      error.response?.data || error.message
    );
  }
};

export const addWishList = async (productCartData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addWishList, productCartData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("API Response: Product added:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to add product:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteWishList = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    const response = await axios.delete(`${ApiRoutes.deleteWishList}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Product wishlist deleted successfully::", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete product:",
      error.response?.data || error.message
    );
    throw error;
  }
};
