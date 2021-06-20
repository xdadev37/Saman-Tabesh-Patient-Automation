import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState = {
  backdrop: false,
  skeleton: false,
};

export const backdropSlice = createSlice({
  name: "backdropSlice",
  initialState,
  reducers: {
    setBackdrop: (state, action: PayloadAction<boolean>) => {
      state.backdrop = action.payload;
    },

    setSkeleton: (state, action: PayloadAction<boolean>) => {
      state.skeleton = action.payload;
    },
  },
});

export const { setBackdrop, setSkeleton } = backdropSlice.actions;

export const selectBackdrop = (state: RootState) => state.backdrop.backdrop;
export const selectSkeleton = (state: RootState) => state.backdrop.skeleton;

export default backdropSlice.reducer;
