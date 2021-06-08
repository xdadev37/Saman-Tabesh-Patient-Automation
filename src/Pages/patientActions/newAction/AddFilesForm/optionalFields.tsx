import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import axios from "axios";
import { selectPatientId } from "../../../../Redux/Slicer/idPasserSlice";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../../Redux/Slicer/alertMessageSlice";
import { setActionForm } from "../../../../Redux/Slicer/actionStatusSlice";
import { setBackdrop } from "../../../../Redux/Slicer/backdropSlice";
import FileFormEditor from "../../../../UI/FileFormEditor";

interface IProps {
  newActionName: string;
  actionId: number;
  setCompletedStatus: (arg: boolean) => void;
}

const OptionalFields: FC<IProps> = ({
  newActionName,
  actionId,
  setCompletedStatus,
}) => {
  const dispatch = useAppDispatch();
  const [PathologyDoc, setPathologyDoc] = useState<object | string>("");
  const [TreatmentDoc, setTreatmentDoc] = useState<object | string>("");
  const [MRIReportDoc, setMRIReportDoc] = useState<object | string>("");
  const [CTReportDoc, setCTReportDoc] = useState<object | string>("");
  const [PETReportDoc, setPETReportDoc] = useState<object | string>("");
  const [SonoReportDoc, setSonoReportDoc] = useState<object | string>("");
  const [MamoReportDoc, setMamoReportDoc] = useState<object | string>("");
  const [LabReportDoc, setLabReportDoc] = useState<object | string>("");
  const selectId = useAppSelector(selectPatientId);

  const dispatchData = async () => {
    dispatch(setBackdrop());
    const dispatcher = new Promise((sent, rejected) => {
      axios
        .post(
          "https://my-json-server.typicode.com/xdadev37/jsonDatabase/optionalForm",
          {
            Name: newActionName,
            ActionId: actionId,
            PatientId: selectId,
            PathologyDoc: PathologyDoc,
            TreatmentDoc: TreatmentDoc,
            MRIReportDoc: MRIReportDoc,
            CTReportDoc: CTReportDoc,
            PETReportDoc: PETReportDoc,
            SonoReportDoc: SonoReportDoc,
            MamoReportDoc: MamoReportDoc,
            LabReportDoc: LabReportDoc,
          }
        )
        .then((res) => {
          if (res.status === 201) {
            dispatch(setAlertText("رویداد با موفقیت ثبت شد"));
            dispatch(setAlertStatus("success"));
            dispatch(setActionForm("checkAction"));

            sent(dispatch(setOpen(true)));
          } else {
            dispatch(setAlertText("ثبت اطلاعات انجام نشد"));
            dispatch(setAlertStatus("error"));

            rejected(dispatch(setOpen(true)));
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
          rejected(dispatch(setOpen(true)));
        })
        .finally(() => dispatch(setBackdrop()));
    });

    await dispatcher;
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
