import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: JSON.parse(localStorage.getItem("authorization.user"))
    ? JSON.parse(localStorage.getItem("authorization.user"))
    : null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Auth_user: (state) => {
      state.auth = localStorage.getItem("authorization.user");
    },
    Clear_user: (state) => {
      state.auth = null;
    },
  },
});

export const { Auth_user, Clear_user } = AuthSlice.actions;

const AuthReducer = AuthSlice.reducer;

export default AuthReducer;
