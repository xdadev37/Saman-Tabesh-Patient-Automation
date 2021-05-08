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
    setAvatar: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setNationalIdDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setPathologyDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setTreatmentDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setCommitmentDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setMRIReportDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setCTReportDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setPETReport: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setSonoReportDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setMamoReportDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setLabReportDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },
  },
});

export const {
  setName,
  setFamilyName,
  setNationalId,
  setFileNumber,
  setAvatar,
  setNationalIdDoc,
  setPathologyDoc,
  setTreatmentDoc,
  setCommitmentDoc,
  setMRIReportDoc,
  setCTReportDoc,
  setPETReport,
  setSonoReportDoc,
  setMamoReportDoc,
  setLabReportDoc,
  setComment,
} = patientInfoSlice.actions;

export const selectRequiredField = (state: RootState) =>
  state.patientInfo.requiredFields[0];
export const selectOptionalField = (state: RootState) =>
  state.patientInfo.optionalFields[0];

export default patientInfoSlice.reducer;
