import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import { setBackdrop } from "../../Redux/Slicer/backdropSlice";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../Redux/Slicer/alertMessageSlice";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();

  const submit = async () => {
    dataGrid.append("Name", requiredField.Name);
    dataGrid.append("FamilyName", requiredField.FamilyName);
    dataGrid.append("NationalId", requiredField.NationalId);
    dataGrid.append("Avatar", requiredField.Avatar);
    dataGrid.append("NationalIdDoc", nationalIdDoc);
    dataGrid.append("Comment", requiredField.Comment);
    dataGrid.append("Diagnosis", requiredField.Diagnosis);
    dataGrid.append("Insurance", requiredField.Insurance);
    dataGrid.append("CommitmentDoc", commitmentDoc);
    dataGrid.append("PolicyDoc", policyDoc);
    dataGrid.append("MobileNo", requiredField.mobileNo);
    dataGrid.append("EmergencyMobileNo", requiredField.emergencyMobileNo);
    dataGrid.append("Birthday", requiredField.Birthday);

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
            history.push("/");

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
