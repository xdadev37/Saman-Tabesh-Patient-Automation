import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const UIMode =
  window.localStorage.getItem("UIMode") === "lightMode" ? false : true;

const initialState = {
  darkMode: UIMode,
};

export const darkModeSlice = createSlice({
  name: "darkModeSlice",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      if (state.darkMode) {
        window.localStorage.setItem("UIMode", "lightMode");
        state.darkMode = false;
      } else {
        window.localStorage.setItem("UIMode", "darkMode");
        state.darkMode = true;
      }
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state: RootState) => state.darkMode.darkMode;

export default darkModeSlice.reducer;
