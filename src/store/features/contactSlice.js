import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchContact, addContact } from "../../server/contactAction";

export const getAllContact = createAsyncThunk("contact/fetch", async () => {
  const response = await fetchContact();
  console.log("API Response:", response);
  return response;
});

export const createContact = createAsyncThunk(
  "contact/add",
  async (productData) => {
    const response = await addContact(productData);
    console.log("API Response: user contact data added:", response);
    return response;
  }
);

const ContacttSlice = createSlice({
  name: "contact",
  initialState: { contact: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllContact.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllContact.fulfilled, (state, action) => {
        state.status = "success";
        state.contact = action.payload;
      })
      .addCase(getAllContact.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        if (Array.isArray(state.contact)) {
          state.contact.push(action.payload);
        } else {
          state.contact = [action.payload];
        }
      })
    //   .addCase(removeProduct.fulfilled, (state, action) => {
    //     // state.products = state.products.filter((product) => product._id !== action.payload);
    //     if (Array.isArray(state.contact)) {
    //       state.contact = state.contact.filter(
    //         (contact) => contact._id !== action.payload
    //       );
    //     }
    //   });
  },
});

export default ContacttSlice.reducer;
