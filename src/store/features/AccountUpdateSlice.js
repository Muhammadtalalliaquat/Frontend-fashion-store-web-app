import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const accountUpdateSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserUpdate: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    setErrorUpdate: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUserUpdate, setErrorUpdate, setLoading } =
  accountUpdateSlice.actions;
export default accountUpdateSlice.reducer;
