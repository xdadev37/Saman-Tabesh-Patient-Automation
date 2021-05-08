import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import patientInfoReducer from "./Slicer/patientInfoSlice";

export const store = configureStore({
  reducer: {
    patientInfo: patientInfoReducer,
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
