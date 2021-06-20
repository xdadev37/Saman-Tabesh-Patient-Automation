import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState = {
  actionForm: "",
};

export const createActionSlice = createSlice({
  name: "createActionSlice",
  initialState,
  reducers: {
    setActionForm: (state, action: PayloadAction<string>) => {
      state.actionForm = action.payload;
    },
  },
});

export const { setActionForm } = createActionSlice.actions;

export const selectActionForm = (state: RootState) =>
  state.createActionForm.actionForm;

export default createActionSlice.reducer;
