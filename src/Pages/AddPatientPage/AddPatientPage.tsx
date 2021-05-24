import { FC, useState } from "react";
import { Button, Grid, Backdrop, CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import axios from "axios";
import NameFields from "./AddFormDescenders/nameFields";
import NumericFields from "./AddFormDescenders/numericFields";
import RequiredFilesFields from "./AddFormDescenders/requiredFilesFields";
import { setPatientId } from "../../Redux/Slicer/idPasserSlice";
import { useHistory } from "react-router-dom";
import { Check, ChevronRight } from "@material-ui/icons";
import AlertSnackbar from "../../UI/AlertSnackbar";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../Redux/Slicer/alertMessageSlice";
import {
  selectAlertText,
  selectAlertStatus,
  selectOpen,
} from "../../Redux/Slicer/alertMessageSlice";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      padding: theme.spacing(10),
      width: "70%",
      "& > *": {
        marginInline: theme.spacing(3),
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
  const { handleSubmit } = methods;
  const [avatar, setAvatar] = useState("");
  const [nationalIdDoc, setNationalIdDoc] = useState("");
  const dispatch = useAppDispatch();
  let history = useHistory();
  const [checkNIdAl, setCheckNIdAl] = useState(false);
  const alertText = useAppSelector(selectAlertText);
  const alertStatus = useAppSelector(selectAlertStatus);
  const open = useAppSelector(selectOpen);
  const [pending, setPending] = useState(false);

  const submit = async () => {
    if (checkNIdAl === false) {
      setPending(true);
      const axiosPromise = new Promise((sent, rejected) => {
        axios
          .post("https://localhost:5001/api/patients", {
            Name: requiredField.Name,
            FamilyName: requiredField.FamilyName,
            NationalId: requiredField.NationalId,
            FileNumber: requiredField.FileNumber,
            // Avatar: avatar,
            // NationalIdDoc: nationalIdDoc,
            Comment: "",
          })
          .then((res) => {
            console.log(res);
            if ((res.status = 201)) {
              dispatch(setPatientId(res.data.id));
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
            dispatch(setAlertText(error.request.responseText));
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
          <NameFields />

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
