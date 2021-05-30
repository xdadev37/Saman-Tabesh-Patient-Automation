import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  actionId: 0,
  actionName: "",
  actionComment: "",
};

export const editActionSlice = createSlice({
  name: "editActionSlice",
  initialState,
  reducers: {
    setActionId: (state, action: PayloadAction<number>) => {
      state.actionId = action.payload;
    },

    setActionName: (state, action: PayloadAction<string>) => {
      state.actionName = action.payload;
    },

    setActionComment: (state, action: PayloadAction<string>) => {
      state.actionComment = action.payload;
    },
  },
});

export const {
  setActionId,
  setActionName,
  setActionComment,
} = editActionSlice.actions;

export const selectActionId = (state: RootState) => state.editAction.actionId;
export const selectActionName = (state: RootState) =>
  state.editAction.actionName;
export const selectActionComment = (state: RootState) =>
  state.editAction.actionComment;

export default editActionSlice.reducer;
