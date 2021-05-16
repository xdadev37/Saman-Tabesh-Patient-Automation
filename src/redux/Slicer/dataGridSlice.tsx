import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = [
  {
    id: 0,
    Name: "",
    FamilyName: "",
    NationalId: 0,
    FileNumber: 0,
    Avatar: "",
    NationalIdDoc: "",
  },
];

export const dataGridSlice = createSlice({
  name: "dataGridSlice",
  initialState,
  reducers: {
    setDataGrid: (state, action: PayloadAction<any>) => {
      state.push(action.payload);
    },
  },
});

export const { setDataGrid } = dataGridSlice.actions;

export const selectDataGrids = (state: RootState) => state.dataGrid;

export default dataGridSlice.reducer;
