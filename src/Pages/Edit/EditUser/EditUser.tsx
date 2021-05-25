import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/alertMessageSlice";

import axios from "axios";

const EditUser: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectPatientId);

  const editUser = async () => {
    // setPending(true);
    const editor = new Promise((edited, failed) => {
      axios
        .put(`http://localhost:3001/optionalForm/${userId}`, {})
        .then((res) => {
          if ((res.status = 201)) {
            dispatch(setAlertText("رویداد با موفقیت ثبت شد."));
            dispatch(setAlertStatus("success"));
            dispatch(setActionForm("mainPage"));

            edited(dispatch(setOpen(true)));
          } else {
            dispatch(setAlertText("ثبت اطلاعات انجام نشد!"));
            dispatch(setAlertStatus("error"));

            failed(dispatch(setOpen(true)));
          }
        })
        .catch((error) => {
          console.log(error.request);
          dispatch(setAlertText(error.request.responseText));
          dispatch(setAlertStatus("error"));

          failed(dispatch(setOpen(true)));
        });
      // .finally(() => setPending(false));
    });

    await editor;
  };

  return <></>;
};

export default EditUser;
