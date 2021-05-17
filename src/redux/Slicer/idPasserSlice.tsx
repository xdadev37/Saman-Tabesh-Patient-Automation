import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  patientId: 0,
  fileId: 0,
};

export const idPasserSlice = createSlice({
  name: "idPasserSlice",
  initialState,
  reducers: {
    setPatientId: (state, action: PayloadAction<number>) => {
      state.patientId = action.payload;
    },

    setFileId: (state, action: PayloadAction<number>) => {
      state.fileId = action.payload;
    },
  },
});

export const { setPatientId, setFileId } = idPasserSlice.actions;

export const selectPatientId = (state: RootState) => state.idPasser.patientId;
export const selectFiletId = (state: RootState) => state.idPasser.fileId;

export default idPasserSlice.reducer;
