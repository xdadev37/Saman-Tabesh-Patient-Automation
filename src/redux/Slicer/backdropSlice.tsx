import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = false;

export const backdropSlice = createSlice({
  name: "backdropSlice",
  initialState,
  reducers: {
    setBackdrop: (state) => (state = state ? false : true),
  },
});

export const { setBackdrop } = backdropSlice.actions;

export const selectBackdrop = (state: RootState) => state.backdrop;

export default backdropSlice.reducer;
