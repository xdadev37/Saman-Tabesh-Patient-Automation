import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: IDropMenu = {
  diagnosisMenu: [
    {
      id: "",
      value: "",
    },
  ],
  insuranceMenu: [
    {
      id: "",
      value: "",
    },
  ],
};

export const dropMenuData = createSlice({
  name: "dropMenuData",
  initialState,
  reducers: {
    setDropDownMenu: (state, action: PayloadAction<IDropMenu>) => {
      state = action.payload;
    },
  },
});

export const { setDropDownMenu } = dropMenuData.actions;

export const selectDropDownMenu = (state: RootState) => state.dropDownMenu;

export default dropMenuData.reducer;
