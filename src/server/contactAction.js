
import axios from "axios";
import { ApiRoutes } from "../constant/constant";


export const fetchContact = async () => {
  try {
    const response = await axios.get(`${ApiRoutes.getContact}`);
    // console.log("Products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch contact:",
      error.response?.data || error.message
    );
  }
};

export const addContact = async (contactData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token is missing!");
      return;
    }

    console.log("Token before sending request:", token);

    const response = await axios.post(ApiRoutes.addContact, contactData, {
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
  }
};
