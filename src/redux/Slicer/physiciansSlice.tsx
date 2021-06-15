import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: IPhysician[] = [
  {
    id: "",
    value: "",
  },
];

export const physicalSlice = createSlice({
  name: "physicalSlice",
  initialState,
  reducers: {
    setPhysicianData: (state, action: PayloadAction<IPhysician[]>) => {
      state = action.payload;
    },
  },
});

export const { setPhysicianData } = physicalSlice.actions;

export const selectPhysicians = (state: RootState) => state.physicians;

export default physicalSlice.reducer;
