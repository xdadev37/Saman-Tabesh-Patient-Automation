import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: IAddFile[] = [
  {
    id: "",
    value: "",
    description: "",
    isAvailable: false,
  },
];

export const addFilesDataSlice = createSlice({
  name: "addFilesDataSlice",
  initialState,
  reducers: {
    setAddFileData: (state, action: PayloadAction<IAddFile>) => {
      state.push(action.payload);
    },

    emptyData: (state) => {
      state.splice(0, Infinity);
    },
  },
});

export const { setAddFileData, emptyData } = addFilesDataSlice.actions;

export const selectAddFilesData = (state: RootState) => state.addFilesData;

export default addFilesDataSlice.reducer;
