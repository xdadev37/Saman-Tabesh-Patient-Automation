import { FC, useState } from "react";
import { Button, Grid } from "@material-ui/core";
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
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../Redux/Slicer/alertMessageSlice";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      padding: theme.spacing(10),
      "& > *": { margin: theme.spacing(1) },
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

  const submit = async () => {
    if (checkNIdAl === false) {
      const axiosPromise = new Promise((sent, rejected) => {
        axios
          .post("http://localhost:3002/requiredForm", {
            Name: requiredField.Name,
            FamilyName: requiredField.FamilyName,
            NationalId: requiredField.NationalId,
            FileNumber: requiredField.FileNumber,
            Avatar: avatar,
            NationalIdDoc: nationalIdDoc,
          })
          .then((res) => {
            console.log(res.data);
            if ((res.status = 201)) {
              dispatch(setPatientId(res.data.id));
              dispatch(setAlertText("اطلاعات اولیه بیمار با موفقیت ثبت شد"));
              dispatch(setAlertStatus("success"));
              history.push("/");

              sent(dispatch(setOpen(true)));
            } else {
              dispatch(setAlertText("ثبت اطلاعات انجام نشد!"));
              dispatch(setAlertStatus("error"));

              rejected(dispatch(setOpen(true)));
            }
          })
          .catch((error) => {
            dispatch(setAlertText(error));
            dispatch(setAlertStatus("error"));

            rejected(dispatch(setOpen(true)));
          });
      });

      await axiosPromise;
    }
  };

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Grid container className={classes.marginTop} direction="column">
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
          <Grid container justify="space-around">
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ChevronRight />}
              onClick={() => history.push("/")}
            >
              برگشت
            </Button>
            <Button
              type="submit"
              startIcon={<Check />}
              variant="contained"
              color="primary"
            >
              ثبت
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default AddPatientPage;
