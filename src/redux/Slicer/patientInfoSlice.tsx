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
      AvatarLink: "",
      NationalIdDoc: "",
      Comment: "",
      Diagnosis: "",
      Insurance: "",
      mobileNo: "",
      emergencyMobileNo: "",
      Birthday: "____/__/__",
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

    setAvatarLink: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].AvatarLink = action.payload;
    },

    setNationalIdDoc: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].NationalIdDoc = action.payload;
    },

    setMobileNo: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].mobileNo = action.payload;
    },

    setEmergencyMobileNo: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].emergencyMobileNo = action.payload;
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
  setAvatarLink,
  setNationalIdDoc,
  setDiagnosis,
  setInsurance,
  setMobileNo,
  setEmergencyMobileNo,
  setBirthday,
} = patientInfoSlice.actions;

export const selectRequiredField = (state: RootState) =>
  state.patientInfo.requiredFields[0];

export default patientInfoSlice.reducer;
