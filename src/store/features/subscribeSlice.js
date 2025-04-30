import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSubscribe, addSubscribe } from "../../server/subscribeAction";

export const getAllSubscribe = createAsyncThunk("subscribe/fetch", async () => {
  const response = await fetchSubscribe();
  console.log("API Response:", response);
  return response;
});

export const createSubscribe = createAsyncThunk(
  "subscribe/add",
  async (subscribeData) => {
    const response = await addSubscribe(subscribeData);
    console.log("API Response: user subscribe data added:", response);
    return response;
  }
);

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: { subscribe: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubscribe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSubscribe.fulfilled, (state, action) => {
        state.status = "success";
        state.subscribe = action.payload;
      })
      .addCase(getAllSubscribe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createSubscribe.fulfilled, (state, action) => {
        if (Array.isArray(state.subscribe)) {
          state.subscribe.push(action.payload);
        } else {
          state.subscribe = [action.payload];
        }
      });
  },
});

export default subscribeSlice.reducer;
