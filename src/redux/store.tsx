import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import patientInfoReducer from "./Slicer/AddDataSlice/patientInfoSlice";
import idPasserReducer from "./Slicer/StatePasserSlice/idPasserSlice";
import dataGridReducer from "./Slicer/CheckDataSlice/dataGridSlice";
import createActionFormReducer from "./Slicer/StatePasserSlice/actionStatusSlice";
import checkActionReducer from "./Slicer/CheckDataSlice/checkActionSlice";
import PaginationReducer from "./Slicer/CheckDataSlice/paginationSlice";
import AlertMessageReducer from "./Slicer/GlobalReduxUIState/alertMessageSlice";
import EditActionReducer from "./Slicer/EditDataSlice/editActionSlice";
import DarkModeReducer from "./Slicer/GlobalReduxUIState/darkModeSlice";
import BackdropReducer from "./Slicer/GlobalReduxUIState/backdropSlice";
import LoginReducer from "./Slicer/AuthSlice/loginSlice";
import UserPassReducer from "./Slicer/AuthSlice/userPassSlice";
import PermissionReducer from "./Slicer/AuthSlice/permissionSlice";
import DropDownMenu from "./Slicer/CachedDataSlice/dropMenuDataSlice";
import AddFilesDataReducer from "./Slicer/CachedDataSlice/addFilesDataSlice";
import FilePageReducer from "./Slicer/CheckDataSlice/filePageSlice";
import PhysiciansReducer from "./Slicer/CachedDataSlice/physiciansSlice";
import PatientFilesReducer from "./Slicer/AddDataSlice/patientFilesSlice";

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
    physicians: PhysiciansReducer,
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
