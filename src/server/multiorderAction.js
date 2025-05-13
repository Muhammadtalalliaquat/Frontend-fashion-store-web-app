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
