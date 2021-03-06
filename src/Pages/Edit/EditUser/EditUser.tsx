import { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPatientId } from "../../../Redux/Slicer/StatePasserSlice/idPasserSlice";
import { setActionForm } from "../../../Redux/Slicer/StatePasserSlice/actionStatusSlice";
import { Button, Grid } from "@material-ui/core";
import { ChevronRight, Assignment } from "@material-ui/icons";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/GlobalReduxUIState/alertMessageSlice";
import { selectDarkMode } from "../../../Redux/Slicer/GlobalReduxUIState/darkModeSlice";
import { setBackdrop } from "../../../Redux/Slicer/GlobalReduxUIState/backdropSlice";
import { MyAvatar } from "../../../UI/Avatar";
import { selectRequiredField } from "../../../Redux/Slicer/AddDataSlice/patientInfoSlice";
import { useForm } from "react-hook-form";
import PatientPageUI from "../../../UI/AddPatientUI/PatientPageUI";
import axios from "axios";

const EditUser: FC = () => {
  const dispatch = useAppDispatch();
  const dataGrid = new FormData();
  const { setValue } = useForm();
  const patientId = useAppSelector(selectPatientId);
  const darkMode = useAppSelector(selectDarkMode);
  const requiredField = useAppSelector(selectRequiredField);
  const [nationalIdDoc, setNationalIdDoc] = useState<Blob | string>("");
  const [commitmentDoc, setCommitmentDoc] = useState<Blob | string>("");
  const [policyDoc, setPolicyDoc] = useState<Blob | string>("");

  useEffect(() => {
    dispatch(setOpen(false));
    setValue("Name", requiredField.Name);
    setValue("FamilyName", requiredField.FamilyName);
    setValue("NationalId", requiredField.NationalId);
    setValue("Avatar", requiredField.Avatar);
    setValue("Comment", requiredField.Comment);
    setValue("DiagnosisIdId", requiredField.DiagnosisId);
    setValue("InsuranceType", requiredField.InsuranceType);
    setValue("PhoneNumber", requiredField.phoneNumber);
    setValue("UrgencyNumber", requiredField.urgencyNumber);
    setValue("DateOfBirth", requiredField.DateOfBirth);
  }, [requiredField, dispatch, setValue]);

  const submit = () => {
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

    dispatch(setBackdrop(true));
    axios
      .patch(
        `https://my-json-server.typicode.com/xdadev37/jsonDatabase/requiredForm/${patientId}`,
        dataGrid
      )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch(setActionForm("mainPage"));
          dispatch(setAlertText("?????????????? ?????????? ?????????? ???? ???????????? ???????????? ????"));
          dispatch(setAlertStatus("success"));

          dispatch(setOpen(true));
        } else {
          dispatch(setAlertText("???????????? ?????????????? ?????????? ??????"));
          dispatch(setAlertStatus("error"));

          dispatch(setOpen(true));
        }
      })
      .catch((error) => {
        console.log(error.request);
        if (error.request.responseText === "") {
          dispatch(setAlertText("???????????? ???? ???????? ???????????? ????????"));
        } else {
          dispatch(setAlertText(error.request.responseText));
        }

        dispatch(setAlertStatus("error"));
        dispatch(setOpen(true));
      })
      .finally(() => dispatch(setBackdrop(false)));
  };

  const avatarFirstLetter = requiredField.FamilyName.charAt(0);

  return (
    <Grid container>
      <Grid container justify="space-around">
        <MyAvatar variant="rounded" alt="Avatar" src={requiredField.Avatar}>
          {avatarFirstLetter}
        </MyAvatar>
        <Button
          target="_blank"
          href={requiredField.NationalIdDocLink}
          rel="noreferrer"
          startIcon={<Assignment />}
          size="large"
          color="primary"
          variant={darkMode ? "contained" : "outlined"}
        >
          ?????? ???????? ?????? ?????? ??????
        </Button>
        <Button
          variant="outlined"
          startIcon={<ChevronRight />}
          onClick={() => dispatch(setActionForm("mainPage"))}
        >
          ??????????
        </Button>
      </Grid>

      <Grid container style={{ marginTop: 20 }}>
        <PatientPageUI
          submit={submit}
          setNationalIdDoc={setNationalIdDoc}
          setCommitmentDoc={setCommitmentDoc}
          setPolicyDoc={setPolicyDoc}
          nationalIdDoc={nationalIdDoc}
          commitmentDoc={commitmentDoc}
          policyDoc={policyDoc}
        />
      </Grid>
    </Grid>
  );
};

export default EditUser;
