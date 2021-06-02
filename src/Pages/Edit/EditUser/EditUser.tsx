import { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import { Button, Grid } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { ChevronRight, Assignment } from "@material-ui/icons";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/alertMessageSlice";
import { selectRequiredField } from "../../../Redux/Slicer/patientInfoSlice";
import { selectDarkMode } from "../../../Redux/Slicer/darkModeSlice";
import { setBackdrop } from "../../../Redux/Slicer/backdropSlice";
import { MyAvatar } from "../../../UI/Avatar";
import AddPatientUI from "../../../UI/AddPatientUI";
import { patch } from "../../../tokenAuth";

const EditUser: FC = () => {
  const requiredField = useAppSelector(selectRequiredField);
  const methods = useForm();
  const { handleSubmit, watch, setValue } = methods;
  const [avatar, setAvatar] = useState<Blob | string>("");
  const [nationalIdDoc, setNationalIdDoc] = useState<Blob | string>("");
  const dispatch = useAppDispatch();
  const [checkNIdAl, setCheckNIdAl] = useState(false);
  const dataGrid = new FormData();
  const patientId = useAppSelector(selectPatientId);
  const darkMode = useAppSelector(selectDarkMode);

  useEffect(() => {
    dispatch(setOpen(false));
    setValue("Name", requiredField.Name);
    setValue("FamilyName", requiredField.FamilyName);
    setValue("NationalId", requiredField.NationalId);
    setValue("FileNumber", requiredField.FileNumber);
  }, [setValue, requiredField, dispatch]);

  const submit = async () => {
    dataGrid.append("Name", requiredField.Name);
    dataGrid.append("FamilyName", requiredField.FamilyName);
    dataGrid.append("NationalId", requiredField.NationalId);
    dataGrid.append("FileNumber", requiredField.FileNumber);
    dataGrid.append("Avatar", avatar);
    dataGrid.append("NationalIdDoc", nationalIdDoc);
    dataGrid.append("Comment", requiredField.Comment);

    if (checkNIdAl === false) {
      dispatch(setBackdrop());
      const axiosPromise = new Promise((sent, rejected) => {
        patch
          .patch(`/api/patients/${patientId}`, dataGrid)
          .then((res) => {
            console.log(res);
            if (res.status === 204) {
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
    }
  };

  const avatarFirstLetter = requiredField.FamilyName.charAt(0);

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Grid container justify="space-around">
          <MyAvatar
            variant="rounded"
            alt="Avatar"
            src={requiredField.AvatarLink}
          >
            {avatarFirstLetter}
          </MyAvatar>
          <Button
            target="_blank"
            href={requiredField.NationalIdDoc}
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

        <AddPatientUI
          requiredField={requiredField}
          watch={watch}
          setAvatar={setAvatar}
          setNationalIdDoc={setNationalIdDoc}
          checkNIdAl={checkNIdAl}
          setCheckNIdAl={setCheckNIdAl}
        />
      </form>
    </FormProvider>
  );
};

export default EditUser;
