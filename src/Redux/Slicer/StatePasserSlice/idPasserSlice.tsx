import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState = {
  patientId: "",
  patientFileId: "",
  actionId: "",
};

export const idPasserSlice = createSlice({
  name: "idPasserSlice",
  initialState,
  reducers: {
    setPatientId: (state, action: PayloadAction<string>) => {
      state.patientId = action.payload;
    },

    setPatientFileId: (state, action: PayloadAction<string>) => {
      state.patientFileId = action.payload;
    },

    setActionId: (state, action: PayloadAction<string>) => {
      state.actionId = action.payload;
    },
  },
});

export const {
  setPatientId,
  setPatientFileId,
  setActionId,
} = idPasserSlice.actions;

export const selectPatientId = (state: RootState) => state.idPasser.patientId;

export const selectPatientFileId = (state: RootState) =>
  state.idPasser.patientFileId;

export const selectActionId = (state: RootState) => state.idPasser.actionId;

export default idPasserSlice.reducer;
