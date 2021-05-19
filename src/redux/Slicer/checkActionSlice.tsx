import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  actionName: [
    {
      Name: "",
      PatientId: 0,
      id: 0,
    },
  ],

  fileLinks: [
    {
      id: 0,
      PathologyDoc: "",
      TreatmentDoc: "",
      CommitmentDoc: "",
      MRIReportDoc: "",
      CTReportDoc: "",
      PETReportDoc: "",
      SonoReportDoc: "",
      MamoReportDoc: "",
      LabReportDoc: "",
    },
  ],

  tempData: [
    {
      id: 0,
      PathologyDoc: "",
      TreatmentDoc: "",
      CommitmentDoc: "",
      MRIReportDoc: "",
      CTReportDoc: "",
      PETReportDoc: "",
      SonoReportDoc: "",
      MamoReportDoc: "",
      LabReportDoc: "",
    },
  ],
};

export const checkActionSlice = createSlice({
  name: "checkActionSlice",
  initialState,
  reducers: {
    setActionName: (state, action: PayloadAction<any>) => {
      state.actionName.push(action.payload);
    },

    setFilesLinks: (state, action: PayloadAction<any>) => {
      state.fileLinks.push(action.payload);
    },

    setFilter: (state, action: PayloadAction<number>) => {
      const filterAction = (arg: { id: number }) => {
        return (arg.id = action.payload);
      };

      state.tempData.concat(state.fileLinks.filter(filterAction));
    },

    emptyData: (state) => {
      state.actionName.splice(0, Infinity);
      state.fileLinks.splice(0, Infinity);
    },
  },
});

export const {
  setActionName,
  setFilesLinks,
  setFilter,
  emptyData,
} = checkActionSlice.actions;

export const selectActionName = (state: RootState) =>
  state.checkAction.actionName;
export const selectFileLinks = (state: RootState) =>
  state.checkAction.fileLinks;
export const selectTempFiles = (state: RootState) => state.checkAction.tempData;

export default checkActionSlice.reducer;
