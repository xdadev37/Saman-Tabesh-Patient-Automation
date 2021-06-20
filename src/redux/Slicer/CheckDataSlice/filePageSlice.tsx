import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState = {
  patientId: "",
  Modality: "",
  fileNumber: "",
  PhysicianId: "",
  Comment: "",
};

export const filePageSlice = createSlice({
  name: "filePageSlice",
  initialState,
  reducers: {
    setPatientId: (state, action: PayloadAction<string>) => {
      state.patientId = action.payload;
    },

    setModality: (state, action: PayloadAction<string>) => {
      state.Modality = action.payload;
    },

    setFileNumber: (state, action: PayloadAction<string>) => {
      state.fileNumber = action.payload;
    },

    setPhysicianId: (state, action: PayloadAction<string>) => {
      state.PhysicianId = action.payload;
    },

    setComment: (state, action: PayloadAction<string>) => {
      state.Comment = action.payload;
    },
  },
});

export const {
  setPatientId,
  setModality,
  setFileNumber,
  setPhysicianId,
  setComment,
} = filePageSlice.actions;

export const selectFilePage = (state: RootState) => state.filePage;

export default filePageSlice.reducer;
