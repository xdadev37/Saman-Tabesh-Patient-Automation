import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState = {
  count: 0,
  page: 1,
  rowsPerPage: 10,
};

export const paginationSlice = createSlice({
  name: "paginationSlice",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setRowPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
  },
});

export const { setCount, setPage, setRowPerPage } = paginationSlice.actions;

export const selectCount = (state: RootState) => state.pagination.count;
export const selectPage = (state: RootState) => state.pagination.page;
export const selectRowsPerPage = (state: RootState) =>
  state.pagination.rowsPerPage;

export default paginationSlice.reducer;
