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
    setAddFileData: (state, action: PayloadAction<IAddFile[]>) => {
      state = action.payload;
    },
  },
});

export const { setAddFileData } = addFilesDataSlice.actions;

export const selectAddFilesData = (state: RootState) => state.addFilesData;

export default addFilesDataSlice.reducer;
