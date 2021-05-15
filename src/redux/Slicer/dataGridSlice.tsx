import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = [
  {
    patientId: 0,
    name: "",
    familyName: "",
    nationalId: 0,
    fileNumber: 0,
    avatar: "",
    nationalIdDoc: "",
  },
];

export const dataGridSlice = createSlice({
  name: "dataGridSlice",
  initialState,
  reducers: {
    setPatientId: (state, action: PayloadAction<number>) => {
      state[0].patientId = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state[0].name = action.payload;
    },

    setFamilyName: (state, action: PayloadAction<string>) => {
      state[0].familyName = action.payload;
    },

    setNationalId: (state, action: PayloadAction<number>) => {
      state[0].nationalId = action.payload;
    },

    setFileNumber: (state, action: PayloadAction<number>) => {
      state[0].fileNumber = action.payload;
    },

    setAvatar: (state, action: PayloadAction<string>) => {
      state[0].avatar = action.payload;
    },

    setNationalIdDoc: (state, action: PayloadAction<string>) => {
      state[0].nationalIdDoc = action.payload;
    },
  },
});

export const {
  setPatientId,
  setName,
  setFamilyName,
  setNationalId,
  setFileNumber,
  setAvatar,
  setNationalIdDoc,
} = dataGridSlice.actions;

export const selectDataGrids = (state: RootState) => state.dataGrid;

export default dataGridSlice.reducer;
