import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import patientInfoReducer from "./Slicer/patientInfoSlice";
import idPasserReducer from "./Slicer/idPasserSlice";
import dataGridReducer from "./Slicer/dataGridSlice";
import createActionFormReducer from "./Slicer/actionStatusSlice";
import checkActionReducer from "./Slicer/checkActionSlice";
import PaginationReducer from "./Slicer/paginationSlice";
import AlertMessageReducer from "./Slicer/alertMessageSlice";
import EditActionReducer from "./Slicer/editActionSlice";

export const store = configureStore({
  reducer: {
    patientInfo: patientInfoReducer,
    idPasser: idPasserReducer,
    dataGrid: dataGridReducer,
    createActionForm: createActionFormReducer,
    checkAction: checkActionReducer,
    pagination: PaginationReducer,
    alertMessage: AlertMessageReducer,
    editAction: EditActionReducer,
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
