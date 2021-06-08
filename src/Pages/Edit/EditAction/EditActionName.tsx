import { FC, useState, Fragment, useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { patch } from "../../../tokenAuth";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import {
  selectActionId,
  selectActionName,
} from "../../../Redux/Slicer/editActionSlice";
import EditFiles from "./EditActionFiles/EditActionFiles";
import { setBackdrop } from "../../../Redux/Slicer/backdropSlice";
import { selectActionComment } from "../../../Redux/Slicer/editActionSlice";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/alertMessageSlice";
import ModalEntry from "../../patientActions/newAction/AddFilesForm/ModalEntry";

const GetActionName: FC = () => {
  const dispatch = useAppDispatch();
  const [completedStatus, setCompletedStatus] = useState(false);
  const actionComment = useAppSelector(selectActionComment);
  const [userComment, setUserComment] = useState(actionComment);
  const selectId = useAppSelector(selectPatientId);
  const actionId = useAppSelector(selectActionId);
  const actionName = useAppSelector(selectActionName);
  const [newActionName, setNewActionName] = useState(actionName);

  useEffect(() => {
    dispatch(setOpen(false));
  }, [dispatch]);

  const newActionSubmit = async () => {
    if (newActionName !== "") {
      dispatch(setBackdrop());
      const submit = new Promise((submitted, failed) => {
        patch
          .patch(
            `https://my-json-server.typicode.com/xdadev37/jsonDatabase/actionName/${actionId}`,
            {
              Name: newActionName,
              PatientId: selectId,
              Comment: userComment,
            }
          )
          .then((res) => {
            if (res.status === 200) {
              submitted(setCompletedStatus(true));
            } else {
              dispatch(setAlertText("ثبت اطلاعات انجام نشد!"));
              dispatch(setAlertStatus("error"));

              failed(dispatch(setOpen(true)));
            }
          })
          .catch((error) => {
            console.log(error.request);
            if (error.request.responseText === "") {
              dispatch(setAlertText("ارتباط با سرور برقرار نیست"));
            } else {
              dispatch(setAlertText(error.request.responseText));
            }

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
        <EditFiles
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
