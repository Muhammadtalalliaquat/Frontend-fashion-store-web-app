import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const orderDiscountProduct = async (orderData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.post(ApiRoutes.placedDiscountsOrder, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response: discounted order placed", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to placed order:",
      error.response?.data || error.message
    );
  }
};

export const fetchDiscountProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    const response = await axios.get(`${ApiRoutes.getDiscountOrder}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch Orders:",
      error.response?.data || error.message
    );
  }
};


export const updateDicountOrderStatus = async (id, orderData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.put(`${ApiRoutes.updateDiscountOrder}/${id}`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Discount Product order status updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update Discount order status:",
      error.response?.data || error.message
    );
  }
};