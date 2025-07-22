import axios from "axios";
import { ApiRoutes } from "../constant/constant";


export const addMulitiOrders = async (orderData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.post(
      ApiRoutes.placedMultipleOrders, orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("API Response: order placed:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to placed order:",
      error.response?.data || error.message
    );
  }
};

export const fetchAllOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    const response = await axios.get(`${ApiRoutes.getAllMultipleOrders}`, {
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


export const fetchChartOrders = async () => {
  try {
    const response = await axios.get(`${ApiRoutes.getAllChartMultipleOrders}`);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch Orders:",
      error.response?.data || error.message
    );
  }
};


export const updateOrderStatus = async (id, orderData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.put(
      `${ApiRoutes.updateMultipleOrders}/${id}`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Product order status updated:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update order status:",
      error.response?.data || error.message
    );
  }
};
