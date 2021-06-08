import { FC, useState, Fragment, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import AddFiles from "./AddFilesForm/optionalFields";
import { setBackdrop } from "../../../Redux/Slicer/backdropSlice";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/alertMessageSlice";
import ModalEntry from "../../../Pages/patientActions/newAction/AddFilesForm/ModalEntry";

const GetActionName: FC = () => {
  const dispatch = useAppDispatch();
  const [newActionName, setNewActionName] = useState("");
  const [userComment, setUserComment] = useState("");
  const [actionId, setActionId] = useState(0);
  const [completedStatus, setCompletedStatus] = useState(false);
  const selectId = useAppSelector(selectPatientId);

  useEffect(() => {
    dispatch(setOpen(false));
  }, [dispatch]);

  const newActionSubmit = async () => {
    if (newActionName !== "") {
      dispatch(setBackdrop());
      const submit = new Promise((submitted, failed) => {
        axios
          .post(
            "https://my-json-server.typicode.com/xdadev37/jsonDatabase/actionName",
            {
              Name: newActionName,
              PatientId: selectId,
              Comment: userComment,
            }
          )
          .then((res) => {
            if (res.status === 201) {
              setActionId(res.data.id);
              submitted(setCompletedStatus(true));
            } else {
              dispatch(setAlertText("ثبت اطلاعات انجام نشد!"));
              dispatch(setAlertStatus("error"));

              failed(dispatch(setOpen(true)));
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch(setAlertText("خطای سرور!"));
            dispatch(setAlertStatus("error"));

            failed(dispatch(setOpen(true)));
          })
          .finally(() => dispatch(setBackdrop()));
      });
      await submit;
    }
  };

  return (
    <Fragment>
      {completedStatus ? (
        <AddFiles
          newActionName={newActionName}
          actionId={actionId}
          setCompletedStatus={setCompletedStatus}
        />
      ) : (
        <Dialog fullScreen open={true}>
          <ModalEntry
            newActionName={newActionName}
            setNewActionName={setNewActionName}
            userComment={userComment}
            setUserComment={setUserComment}
            submit={newActionSubmit}
          />
        </Dialog>
      )}
    </Fragment>
  );
};

export default GetActionName;
