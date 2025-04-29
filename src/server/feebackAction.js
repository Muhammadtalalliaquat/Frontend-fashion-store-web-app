import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const fetchFeedback = async () => {
  try {
    const response = await axios.get(`${ApiRoutes.getFeedBack}`);
    // console.log("Products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch feeback:",
      error.response?.data || error.message
    );
  }
};

export const addFeedback = async (feebackData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addFeedBack, feebackData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("API Response: Product added:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to add feedback:",
      error.response?.data || error.message
    );
  }
};
