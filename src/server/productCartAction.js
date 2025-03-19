import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const fetchCart = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.get(`${ApiRoutes.getCart}`, {
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


export const addCart = async (productCartData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addCart, productCartData, {
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
