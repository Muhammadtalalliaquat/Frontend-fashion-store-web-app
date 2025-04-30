import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const fetchSubscribe = async () => {
  try {
    const response = await axios.get(`${ApiRoutes.getSubscribe}`);
    // console.log("Products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch Subscribe:",
      error.response?.data || error.message
    );
  }
};

export const addSubscribe = async (subscribeData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addSubscribe, subscribeData);
    // console.log("API Response: Product added:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to add Subscribe:",
      error.response?.data || error.message
    );
  }
};
