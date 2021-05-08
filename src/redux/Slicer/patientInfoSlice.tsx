import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState, AppThunk } from "../store";

interface IInitialState {
  requiredFields: IRequiredFields[];
  optionalFields: IOptionalFields[];
}

const initialState: IInitialState = {
  requiredFields: [
    {
      Name: "",
      FamilyName: "",
      NationalId: 0,
      FileNumber: 0,
      Avatar: "",
    },
  ],

  optionalFields: [
    {
      NationalIdDoc: "",
      PathologyDoc: "",
      TreatmentDoc: "",
      CommitmentDoc: "",
      MRIReportDoc: "",
      CTReportDoc: "",
      PETReportDoc: "",
      SonoReportDoc: "",
      MamoReportDoc: "",
      LabReportDoc: "",
      Comment: "",
    },
  ],
};

export const patientInfoSlice = createSlice({
  name: "patientInfoSlice",
  initialState,
  reducers: {
    setRequiredFields: (state, action: PayloadAction<[]>) => {
      state.requiredFields = action.payload;
    },

    setOptionalFields: (state, action: PayloadAction<[]>) => {
      state.optionalFields = action.payload;
    },
  },
});

export const {
  setRequiredFields,
  setOptionalFields,
} = patientInfoSlice.actions;

export const selectRequiredField = (state: RootState) =>
  state.patientInfo.requiredFields;
export const selectOptionalField = (state: RootState) =>
  state.patientInfo.optionalFields;

export default patientInfoSlice.reducer;
