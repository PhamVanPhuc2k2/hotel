import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      accessToken: null,
      loading: false,
      error: null,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.loading = true;
    },
    loginSuccess: (state, action) => {
      state.login.loading = false;
      state.login.currentUser = action.payload.user;
      state.login.accessToken = action.payload.access_token;
      state.login.error = null;
    },
    loginFailed: (state, action) => {
      state.login.loading = false;
      state.login.error = action.payload;
    },
    logout: (state) => {
      state.login.currentUser = null;
      state.login.accessToken = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logout } =
  authSlice.actions;

export default authSlice.reducer;
