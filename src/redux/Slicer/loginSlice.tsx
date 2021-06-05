import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const tokenValidation =
  window.sessionStorage.getItem("token") === null ? false : true;

const initialState = tokenValidation;

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    setLogin: (state) => (state = state ? false : true),
  },
});

export const { setLogin } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
