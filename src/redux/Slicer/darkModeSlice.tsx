import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const UIMode =
  window.localStorage.getItem("UIMode") === "darkMode" ? true : false;

const initialState = UIMode;

export const darkModeSlice = createSlice({
  name: "darkModeSlice",
  initialState,
  reducers: {
    setDarkMode: (state) => {
      if (state) {
        window.localStorage.setItem("UIMode", "lightMode");
        state = false;
      } else {
        window.localStorage.setItem("UIMode", "darkMode");
        state = true;
      }

      return state;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state: RootState) => state.darkMode;

export default darkModeSlice.reducer;
