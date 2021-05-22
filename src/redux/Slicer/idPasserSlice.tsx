import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  patientId: 0,
};

export const idPasserSlice = createSlice({
  name: "idPasserSlice",
  initialState,
  reducers: {
    setPatientId: (state, action: PayloadAction<number>) => {
      state.patientId = action.payload;
    },
  },
});

export const { setPatientId } = idPasserSlice.actions;

export const selectPatientId = (state: RootState) => state.idPasser.patientId;

export default idPasserSlice.reducer;
