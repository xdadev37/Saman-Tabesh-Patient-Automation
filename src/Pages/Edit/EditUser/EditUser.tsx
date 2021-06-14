import { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import { Button, Grid } from "@material-ui/core";
import { ChevronRight, Assignment } from "@material-ui/icons";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/alertMessageSlice";
import { selectDarkMode } from "../../../Redux/Slicer/darkModeSlice";
import { setBackdrop } from "../../../Redux/Slicer/backdropSlice";
import { MyAvatar } from "../../../UI/Avatar";
import { selectRequiredField } from "../../../Redux/Slicer/patientInfoSlice";
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
    setValue("Diagnosis", requiredField.Diagnosis);
    setValue("Insurance", requiredField.Insurance);
    setValue("PhoneNumber", requiredField.phoneNumber);
    setValue("UrgencyNumber", requiredField.urgencyNumber);
    setValue("Birthday", requiredField.Birthday);
  }, [requiredField, dispatch, setValue]);

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
    dataGrid.append("PhoneNumber", requiredField.phoneNumber);
    dataGrid.append("UrgencyNumber", requiredField.urgencyNumber);
    dataGrid.append("Birthday", requiredField.Birthday);

    dispatch(setBackdrop());
    const axiosPromise = new Promise((sent, rejected) => {
      axios
        .patch(
          `https://my-json-server.typicode.com/xdadev37/jsonDatabase/requiredForm/${patientId}`,
          dataGrid
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            dispatch(setActionForm("mainPage"));
            dispatch(setAlertText("اطلاعات اولیه بیمار با موفقیت ویرایش شد"));
            dispatch(setAlertStatus("success"));

            sent(dispatch(setOpen(true)));
          } else {
            dispatch(setAlertText("ویرایش اطلاعات انجام نشد"));
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
          کپی کارت ملی ثبت شده
        </Button>
        <Button
          variant="outlined"
          startIcon={<ChevronRight />}
          onClick={() => dispatch(setActionForm("mainPage"))}
        >
          برگشت
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
