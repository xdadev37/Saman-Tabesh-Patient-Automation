import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: IDataGrid[] = [
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
    setDataGrid: (state, action: PayloadAction<IDataGrid>) => {
      state.push(action.payload);
    },
    emptyData: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { setDataGrid, emptyData } = dataGridSlice.actions;

export const selectDataGrids = (state: RootState) => state.dataGrid;

export default dataGridSlice.reducer;
