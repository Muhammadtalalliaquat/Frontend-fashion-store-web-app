import axios from "axios";
import { ApiRoutes } from "../constant/constant";

export const fetchReviews = async (id) => {
  try {
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   console.error("Token is missing!");
    //   return;
    // }

    const response = await axios.get(`${ApiRoutes.getReview}/${id}`);
    // console.log("Products reviews fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch review:",
      error.response?.data || error.message
    );
  }
};


export const addReviews = async (productReviewsData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    
    console.log("Sending Review Data:", productReviewsData);
    // console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addReviews, productReviewsData , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("API Response: Product added:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to add review:",
      error.response?.data || error.message
    );
    throw error;
  }
};


export const deleteReviews = async (id) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }
    const response = await axios.delete(`${ApiRoutes.deleteReviews}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Product review deleted successfully::", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to delete review:",
      error.response?.data || error.message
    );
    throw error;
  }
};