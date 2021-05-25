import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface IInitialState {
  requiredFields: IRequiredFields[];
}

const initialState: IInitialState = {
  requiredFields: [
    {
      Name: "",
      FamilyName: "",
      NationalId: 0,
      FileNumber: 0,
      Comment: "",
    },
  ],
};

export const patientInfoSlice = createSlice({
  name: "patientInfoSlice",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Name = action.payload;
    },

    setFamilyName: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].FamilyName = action.payload;
    },

    setNationalId: (state, action: PayloadAction<number>) => {
      state.requiredFields[0].NationalId = action.payload;
    },

    setFileNumber: (state, action: PayloadAction<number>) => {
      state.requiredFields[0].FileNumber = action.payload;
    },

    setComment: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Comment = action.payload;
    },
  },
});

export const {
  setName,
  setFamilyName,
  setNationalId,
  setFileNumber,
  setComment,
} = patientInfoSlice.actions;

export const selectRequiredField = (state: RootState) =>
  state.patientInfo.requiredFields[0];

export default patientInfoSlice.reducer;
