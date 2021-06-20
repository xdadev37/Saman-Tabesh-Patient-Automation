import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState: IRequiredFields = {
  Name: "",
  FamilyName: "",
  NationalId: "",
  Avatar: "",
  NationalIdDocLink: "",
  Comment: "",
  DiagnosisId: "",
  InsuranceType: "",
  phoneNumber: "",
  urgencyNumber: "",
  DateOfBirth: "",
};
export const patientInfoSlice = createSlice({
  name: "patientInfoSlice",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.Name = action.payload;
    },

    setFamilyName: (state, action: PayloadAction<string>) => {
      state.FamilyName = action.payload;
    },

    setNationalId: (state, action: PayloadAction<string>) => {
      state.NationalId = action.payload;
    },

    setAvatar: (state, action: PayloadAction<string>) => {
      state.Avatar = action.payload;
    },

    setNationalIdDocLink: (state, action: PayloadAction<string>) => {
      state.NationalIdDocLink = action.payload;
    },

    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = `09${action.payload}`;
    },

    setUrgencyNumber: (state, action: PayloadAction<string>) => {
      state.urgencyNumber = `09${action.payload}`;
    },

    setDateOfBirth: (state, action: PayloadAction<string>) => {
      state.DateOfBirth = action.payload;
    },

    setComment: (state, action: PayloadAction<string>) => {
      state.Comment = action.payload;
    },

    setDiagnosisId: (state, action: PayloadAction<string>) => {
      state.DiagnosisId = action.payload;
    },

    setInsuranceType: (state, action: PayloadAction<string>) => {
      state.InsuranceType = action.payload;
    },

    setAllPatientData: (state, action: PayloadAction<IRequiredFields>) => {
      state = action.payload;
    },
  },
});

export const {
  setName,
  setFamilyName,
  setNationalId,
  setComment,
  setAvatar,
  setNationalIdDocLink,
  setDiagnosisId,
  setInsuranceType,
  setPhoneNumber,
  setUrgencyNumber,
  setDateOfBirth,
  setAllPatientData,
} = patientInfoSlice.actions;

export const selectRequiredField = (state: RootState) => state.patientInfo;

export default patientInfoSlice.reducer;
