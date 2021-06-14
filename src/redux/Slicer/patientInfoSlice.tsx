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
      NationalId: "",
      Avatar: "",
      NationalIdDocLink: "",
      Comment: "",
      Diagnosis: "",
      Insurance: "",
      mobileNo: "",
      emergencyMobileNo: "",
      Birthday: "",
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

    setNationalId: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].NationalId = action.payload;
    },

    setAvatar: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Avatar = action.payload;
    },

    setNationalIdDocLink: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].NationalIdDocLink = action.payload;
    },

    setMobileNo: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].mobileNo = `09${action.payload}`;
    },

    setEmergencyMobileNo: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].emergencyMobileNo = `09${action.payload}`;
    },

    setBirthday: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Birthday = action.payload;
    },

    setComment: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Comment = action.payload;
    },

    setDiagnosis: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Diagnosis = action.payload;
    },

    setInsurance: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].Insurance = action.payload;
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
  setDiagnosis,
  setInsurance,
  setMobileNo,
  setEmergencyMobileNo,
  setBirthday,
} = patientInfoSlice.actions;

export const selectRequiredField = (state: RootState) =>
  state.patientInfo.requiredFields[0];

export default patientInfoSlice.reducer;
