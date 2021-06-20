import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState: IActionItems[] = [
  {
    id: 0,
    Name: "",
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
];

export const checkActionSlice = createSlice({
  name: "checkActionSlice",
  initialState,
  reducers: {
    setFilesLinks: (state, action: PayloadAction<IActionItems>) => {
      state.push(action.payload);
    },

    emptyData: (state) => {
      state.splice(0, Infinity);
    },
  },
});

export const { setFilesLinks, emptyData } = checkActionSlice.actions;

export const selectFileLinks = (state: RootState) => state.checkAction;

export default checkActionSlice.reducer;
