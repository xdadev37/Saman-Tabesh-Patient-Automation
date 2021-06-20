import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState = {
  name: "",
  familyName: "",
};

export const permissionSlice = createSlice({
  name: "permissionSlice",
  initialState,
  reducers: {
    setDocName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setDocFamilyName: (state, action: PayloadAction<string>) => {
      state.familyName = action.payload;
    },
  },
});

export const { setDocName, setDocFamilyName } = permissionSlice.actions;

export const selectDocName = (state: RootState) => state.permission.name;
export const selectDocFamilyName = (state: RootState) =>
  state.permission.familyName;

export default permissionSlice.reducer;
