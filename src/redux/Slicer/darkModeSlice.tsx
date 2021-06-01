import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  darkMode: false,
};

export const darkModeSlice = createSlice({
  name: "darkModeSlice",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      if (state.darkMode) {
        state.darkMode = false;
      } else {
        state.darkMode = true;
      }
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state: RootState) => state.darkMode.darkMode;

export default darkModeSlice.reducer;
