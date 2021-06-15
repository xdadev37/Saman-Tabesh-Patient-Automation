import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import { setBackdrop } from "../../Redux/Slicer/backdropSlice";
import { setPatientId } from "../../Redux/Slicer/idPasserSlice";
import { setActionForm } from "../../Redux/Slicer/actionStatusSlice";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../Redux/Slicer/alertMessageSlice";
import axios from "axios";
import PatientPageUI from "../../UI/AddPatientUI/PatientPageUI";
// import {
//   setDropDownMenu,
//   selectDropDownMenu,
// } from "../../Redux/Slicer/dropMenuDataSlice";

const AddPatientPage: FC = () => {
  const requiredField = useAppSelector(selectRequiredField);
  const dataGrid = new FormData();
  const [nationalIdDoc, setNationalIdDoc] = useState<Blob | string>("");
  const [commitmentDoc, setCommitmentDoc] = useState<Blob | string>("");
  const [policyDoc, setPolicyDoc] = useState<Blob | string>("");
  const dispatch = useAppDispatch();

  const submit = async () => {
    dataGrid.append("Name", requiredField.Name);
    dataGrid.append("FamilyName", requiredField.FamilyName);
    dataGrid.append("NationalId", requiredField.NationalId);
    dataGrid.append("Avatar", requiredField.Avatar);
    dataGrid.append("NationalIdDoc", nationalIdDoc);
    dataGrid.append("Comment", requiredField.Comment);
    dataGrid.append("DiagnosisIdId", requiredField.DiagnosisId);
    dataGrid.append("InsuranceType", requiredField.InsuranceType);
    dataGrid.append("CommitmentDoc", commitmentDoc);
    dataGrid.append("PolicyDoc", policyDoc);
    dataGrid.append("PhoneNumber", requiredField.phoneNumber);
    dataGrid.append("UrgencyNumber", requiredField.urgencyNumber);
    dataGrid.append("DateOfBirth", requiredField.DateOfBirth);

    dispatch(setBackdrop());
    const axiosPromise = new Promise((sent, rejected) => {
      axios
        .post(
          "https://my-json-server.typicode.com/xdadev37/jsonDatabase/requiredForm",
          dataGrid
        )
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            dispatch(setAlertText("اطلاعات اولیه بیمار با موفقیت ثبت شد"));
            dispatch(setAlertStatus("success"));
            dispatch(setPatientId(res.data.id));
            dispatch(setActionForm("addFile"));

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

    await axiosPromise;
  };

  return (
    <PatientPageUI
      submit={submit}
      setNationalIdDoc={setNationalIdDoc}
      setCommitmentDoc={setCommitmentDoc}
      setPolicyDoc={setPolicyDoc}
      nationalIdDoc={nationalIdDoc}
      commitmentDoc={commitmentDoc}
      policyDoc={policyDoc}
    />
  );
};

export default AddPatientPage;
