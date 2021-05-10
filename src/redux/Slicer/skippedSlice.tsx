import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  skipped: new Set<number>(),
};

export const skippedSlice = createSlice({
    name: "skippedSlice",
    initialState,
    reducers:{
        // setSkipped:(state)
    }
})