import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import patientInfoReducer from "./Slicer/patientInfoSlice";
import collapsibleReducer from "./Slicer/collapsibleSlice";

export const store = configureStore({
  reducer: {
    patientInfo: patientInfoReducer,
    collapsibleTable: collapsibleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<[]>
>;
