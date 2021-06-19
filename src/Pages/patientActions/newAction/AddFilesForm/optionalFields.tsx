import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import axios from "axios";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../../Redux/Slicer/alertMessageSlice";
import { setActionForm } from "../../../../Redux/Slicer/actionStatusSlice";
import { setBackdrop } from "../../../../Redux/Slicer/backdropSlice";
import FileFormEditor from "../../../../UI/FileFormEditor";
import { selectPatientFileId } from "../../../../Redux/Slicer/idPasserSlice";

interface IProps {
  newActionName: string;
  userComment: string;
  setCompletedStatus: (arg: boolean) => void;
}

const OptionalFields: FC<IProps> = ({
  newActionName,
  userComment,
  setCompletedStatus,
}) => {
  const dispatch = useAppDispatch();
  const [PathologyDoc, setPathologyDoc] = useState<Blob | string>("");
  const [TreatmentDoc, setTreatmentDoc] = useState<Blob | string>("");
  const [MRIReportDoc, setMRIReportDoc] = useState<Blob | string>("");
  const [CTReportDoc, setCTReportDoc] = useState<Blob | string>("");
  const [PETReportDoc, setPETReportDoc] = useState<Blob | string>("");
  const [SonoReportDoc, setSonoReportDoc] = useState<Blob | string>("");
  const [MamoReportDoc, setMamoReportDoc] = useState<Blob | string>("");
  const [LabReportDoc, setLabReportDoc] = useState<Blob | string>("");
  const [actionId, setActionId] = useState("");
  const patientFileId = useAppSelector(selectPatientFileId);
  const actionNameGrid = new FormData();
  const fileGrid = new FormData();

  const dispatchData = () => {
    dispatch(setBackdrop(true));
    actionNameGrid.append("newActionName", newActionName);
    actionNameGrid.append("userComment", userComment);
    actionNameGrid.append("patientFileId", patientFileId);

    axios
      .post("actionDB", { actionNameGrid })
      .then(async (res) => {
        console.log(res);

        if (res.status === 201) {
          await setActionId(res.data.actionId);

          fileGrid.append("ActionId", actionId);
          fileGrid.append("PathologyDoc", PathologyDoc);
          fileGrid.append("TreatmentDoc", TreatmentDoc);
          fileGrid.append("MRIReportDoc", MRIReportDoc);
          fileGrid.append("CTReportDoc", CTReportDoc);
          fileGrid.append("PETReportDoc", PETReportDoc);
          fileGrid.append("SonoReportDoc", SonoReportDoc);
          fileGrid.append("MamoReportDoc", MamoReportDoc);
          fileGrid.append("LabReportDoc", LabReportDoc);

          axios
            .post(
              "https://my-json-server.typicode.com/xdadev37/jsonDatabase/optionalForm",
              { fileGrid }
            )
            .then((res) => {
              if (res.status === 201) {
                dispatch(setAlertText("رویداد با موفقیت ثبت شد"));
                dispatch(setAlertStatus("success"));
                dispatch(setActionForm("checkAction"));

                dispatch(setOpen(true));
              } else {
                dispatch(setAlertText("ثبت اطلاعات انجام نشد"));
                dispatch(setAlertStatus("error"));

                dispatch(setOpen(true));
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
              dispatch(setOpen(true));
            })
            .finally(() => dispatch(setBackdrop(false)));
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
        dispatch(setOpen(true));
      })
      .finally(() => dispatch(setBackdrop(false)));
  };

  return (
    <FileFormEditor
      setCompletedStatus={setCompletedStatus}
      submit={dispatchData}
      newActionName={newActionName}
      setPathologyDoc={setPathologyDoc}
      setTreatmentDoc={setTreatmentDoc}
      setMRIReportDoc={setMRIReportDoc}
      setCTReportDoc={setCTReportDoc}
      setPETReportDoc={setPETReportDoc}
      setSonoReportDoc={setSonoReportDoc}
      setMamoReportDoc={setMamoReportDoc}
      setLabReportDoc={setLabReportDoc}
    />
  );
};

export default OptionalFields;
