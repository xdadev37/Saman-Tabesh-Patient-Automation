import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import patientInfoReducer from "./Slicer/patientInfoSlice";
import idPasserReducer from "./Slicer/idPasserSlice";
import dataGridReducer from "./Slicer/dataGridSlice";
import createActionFormReducer from "./Slicer/actionStatusSlice";
import checkActionReducer from "./Slicer/checkActionSlice";
import PaginationReducer from "./Slicer/paginationSlice";
import AlertMessageReducer from "./Slicer/alertMessageSlice";
import EditActionReducer from "./Slicer/editActionSlice";
import DarkModeReducer from "./Slicer/darkModeSlice";
import BackdropReducer from "./Slicer/backdropSlice";
import LoginReducer from "./Slicer/loginSlice";
import UserPassReducer from "./Slicer/userPassSlice";
import PermissionReducer from "./Slicer/permissionSlice";
import DropDownMenu from "./Slicer/dropMenuDataSlice";
import AddFilesDataReducer from "./Slicer/addFilesDataSlice";
import FilePageReducer from "./Slicer/filePageSlice";
import PhysiciansSlice from "./Slicer/physiciansSlice";
import PatientFilesReducer from "./Slicer/patientFilesSlice";

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
    darkMode: DarkModeReducer,
    backdrop: BackdropReducer,
    login: LoginReducer,
    userPass: UserPassReducer,
    permission: PermissionReducer,
    dropDownMenu: DropDownMenu,
    addFilesData: AddFilesDataReducer,
    filePage: FilePageReducer,
    physicians: PhysiciansSlice,
    patientFiles: PatientFilesReducer,
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
