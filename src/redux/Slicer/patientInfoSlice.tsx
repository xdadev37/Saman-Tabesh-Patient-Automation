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
      phoneNumber: "",
      urgencyNumber: "",
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

    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].phoneNumber = `09${action.payload}`;
    },

    setUrgencyNumber: (state, action: PayloadAction<string>) => {
      state.requiredFields[0].urgencyNumber = `09${action.payload}`;
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
  setPhoneNumber,
  setUrgencyNumber,
  setBirthday,
} = patientInfoSlice.actions;

export const selectRequiredField = (state: RootState) =>
  state.patientInfo.requiredFields[0];

export default patientInfoSlice.reducer;
