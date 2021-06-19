import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: IPatientFiles[] = [
  {
    id: "",
    physicianName: "",
    fileNumber: "",
    comment: "",
  },
];

export const patientFilesSlice = createSlice({
  name: "patientFileSlice",
  initialState,
  reducers: {
    setPatientFiles: (state, action: PayloadAction<IPatientFiles>) => {
      state.push(action.payload);
    },
  },
});

export const { setPatientFiles } = patientFilesSlice.actions;

export const selectPatientFiles = (state: RootState) => state.patientFiles[0];

export default patientFilesSlice.reducer;
