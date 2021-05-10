import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  open: false,
};

export const collapsibleSlice = createSlice({
  name: "collapsibleSlice",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = collapsibleSlice.actions;

export const selectOpen = (state: RootState) => state.collapsibleTable.open;

export default collapsibleSlice.reducer;
