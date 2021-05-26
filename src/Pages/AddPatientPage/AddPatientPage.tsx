import { FC, useState, useEffect } from "react";
import { Button, Grid, Backdrop, CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import {
  selectRequiredField,
  setName,
  setFamilyName,
  setNationalId,
  setFileNumber,
} from "../../Redux/Slicer/patientInfoSlice";
import axios from "axios";
import NameFields from "./AddFormDescenders/nameFields";
import NumericFields from "./AddFormDescenders/numericFields";
import RequiredFilesFields from "./AddFormDescenders/requiredFilesFields";
import { useHistory } from "react-router-dom";
import { Check, ChevronRight } from "@material-ui/icons";
import AlertSnackbar from "../../UI/AlertSnackbar";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
  selectAlertText,
  selectAlertStatus,
  selectOpen,
} from "../../Redux/Slicer/alertMessageSlice";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      paddingTop: theme.spacing(15),
      paddingBottom: theme.spacing(15),
      width: "70%",
      "& > *": {
        marginInline: theme.spacing(10),
      },
      "& > label": {
        marginTop: theme.spacing(3),
      },
    },
    marginTop: {
      margin: theme.spacing(10),
      float: "right",
      width: "10%",
    },
  })
);

const AddPatientPage: FC = () => {
  const classes = useStyle();
  const requiredField = useAppSelector(selectRequiredField);
  const methods = useForm();
  const { handleSubmit, watch } = methods;
  const [avatar, setAvatar] = useState<Blob | string>("");
  const [nationalIdDoc, setNationalIdDoc] = useState<Blob | string>("");
  const dispatch = useAppDispatch();
  let history = useHistory();
  const [checkNIdAl, setCheckNIdAl] = useState(false);
  const alertText = useAppSelector(selectAlertText);
  const alertStatus = useAppSelector(selectAlertStatus);
  const open = useAppSelector(selectOpen);
  const [pending, setPending] = useState(false);
  const dataGrid = new FormData();

  useEffect(() => {
    dispatch(setOpen(false));
    dispatch(setName(""));
    dispatch(setFamilyName(""));
    dispatch(setNationalId(""));
    dispatch(setFileNumber(""));
  }, [dispatch]);

  const submit = async () => {
    dataGrid.append("Name", requiredField.Name);
    dataGrid.append("FamilyName", requiredField.FamilyName);
    dataGrid.append("NationalId", requiredField.NationalId);
    dataGrid.append("FileNumber", requiredField.FileNumber);
    dataGrid.append("Avatar", avatar);
    dataGrid.append("NationalIdDoc", nationalIdDoc);
    dataGrid.append("Comment", requiredField.Comment);

    if (checkNIdAl === false) {
      setPending(true);
      const axiosPromise = new Promise((sent, rejected) => {
        axios
          .post("https://localhost:5001/api/patients", dataGrid)
          .then((res) => {
            console.log(res);
            if ((res.status = 204)) {
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
          .finally(() => setPending(false));
      });

      await axiosPromise;
    }
  };

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Button
          variant="outlined"
          startIcon={<ChevronRight />}
          onClick={() => history.push("/")}
          className={classes.marginTop}
        >
          برگشت
        </Button>

        <Grid item className={classes.form}>
          {/* Names */}
          <NameFields
            id="Name"
            title="نام"
            placeholder="نام بیمار"
            setState={(arg) => dispatch(setName(watch(arg)))}
            defaultState={requiredField.Name}
          />
          <NameFields
            id="FamilyName"
            title="نام خانوادگی"
            placeholder="نام خانوادگی بیمار"
            setState={(arg) => dispatch(setFamilyName(watch(arg)))}
            defaultState={requiredField.FamilyName}
          />

          {/* NumericFields */}
          <NumericFields
            checkNIdAl={checkNIdAl}
            setCheckNIdAl={setCheckNIdAl}
          />

          {/* requiredFilesFields */}
          <RequiredFilesFields
            setAvatar={setAvatar}
            setNationalIdDoc={setNationalIdDoc}
          />
          <Grid container justify="flex-end">
            <Button
              type="submit"
              startIcon={<Check />}
              variant="contained"
              color="primary"
              style={{ width: "30%" }}
            >
              ثبت
            </Button>
          </Grid>
        </Grid>
      </form>
      <AlertSnackbar open={open} alertStatus={alertStatus}>
        {alertText}
      </AlertSnackbar>
      <Backdrop open={pending}>
        <CircularProgress />
      </Backdrop>
    </FormProvider>
  );
};

export default AddPatientPage;
