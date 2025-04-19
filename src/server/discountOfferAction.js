import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const addDiscount = async (orderData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.post(ApiRoutes.addDiscounts, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response: order discount add", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to placed order:",
      error.response?.data || error.message
    );
  }
};



export const fetchDiscount = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    const response = await axios.get(`${ApiRoutes.getDiscount}`, {
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



export const updateDiscount = async (id, orderData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    const response = await axios.put(`${ApiRoutes.updateDiscount}/${id}`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("update Discount offer:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to update Discount offer:",
      error.response?.data || error.message
    );
  }
};