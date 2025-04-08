import axios from "axios";
import { ApiRoutes } from "../constant/constant";



export const fetchOrder = async () => {
  try {
     const token = localStorage.getItem("token");

     if (!token) {
       console.error("Token is missing!");
       return;
     }
     const response = await axios.get(`${ApiRoutes.getOrders}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
    // const response = await axios.get(`${ApiRoutes.getOrders}`);
    // console.log("Products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch Orders:",
      error.response?.data || error.message
    );
  }
};


export const addOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    // console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addOrder, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API Response: order placed:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to placed order:",
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

    const response = await axios.put(`${ApiRoutes.updateOrder}/${id}`, orderData,
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