import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  alertText: "",
  alertStatus: "",
  open: false,
};

export const alertMessageSlice = createSlice({
  name: "alertMessageSlice",
  initialState,
  reducers: {
    setAlertText: (state, action: PayloadAction<string>) => {
      state.alertText = action.payload;
    },

    setAlertStatus: (state, action: PayloadAction<string>) => {
      state.alertStatus = action.payload;
    },

    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const {
  setAlertStatus,
  setAlertText,
  setOpen,
} = alertMessageSlice.actions;

export const selectAlertText = (state: RootState) =>
  state.alertMessage.alertText;
export const selectAlertStatus = (state: RootState) =>
  state.alertMessage.alertStatus;
export const selectOpen = (state: RootState) => state.alertMessage.open;

export default alertMessageSlice.reducer;
