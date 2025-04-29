import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFeedback, addFeedback } from "../../server/feebackAction";

export const getAllFeedback = createAsyncThunk("feedback/fetch", async () => {
  const response = await fetchFeedback();
  console.log("API Response:", response);
  return response;
});

export const createFeedback = createAsyncThunk("feedback/add", async (feebackData) => {
  const response = await addFeedback(feebackData);
  console.log("API Response: user feeback data added:", response);
  return response;
});

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: { feedback: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFeedback.fulfilled, (state, action) => {
        state.status = "success";
        state.feedback = action.payload;
      })
      .addCase(getAllFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        if (Array.isArray(state.feedback)) {
          state.feedback.push(action.payload);
        } else {
          state.feedback = [action.payload];
        }
      });
  },
});

export default feedbackSlice.reducer;
