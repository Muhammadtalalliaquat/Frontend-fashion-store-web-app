import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  emailVerifed: false,
  emailVerifedMsg: ``,
  error: null,
};

export const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.error = null;
      state.emailVerifed = action.payload.verifiedEmail || false;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setSuccess: (state, action) => {
      state.emailVerifed = action.payload.verifiedEmail;
      state.emailVerifedMsg = "Your email has been verified!";
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    // setSuccess: (state) => {
    //   state.emailVerifed = true;
    //   state.emailVerifedMsg = "Your email has been verified!";
    //   state.isAuthenticated = true;
    // },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, clearUser, setSuccess, setError } = userSlice.actions;

export default userSlice.reducer;
