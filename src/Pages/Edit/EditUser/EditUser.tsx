import { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import { Button, Grid, Avatar } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Check, ChevronRight, Assignment } from "@material-ui/icons";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/alertMessageSlice";
import axios from "axios";
import {
  selectRequiredField,
  setName,
  setFamilyName,
} from "../../../Redux/Slicer/patientInfoSlice";
import NameFields from "../../AddPatientPage/AddFormDescenders/nameFields";
import NumericFields from "../../AddPatientPage/AddFormDescenders/numericFields";
import RequiredFilesFields from "../../AddPatientPage/AddFormDescenders/requiredFilesFields";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      marginBottom: theme.spacing(10),
      width: "70%",
      "& > *": {
        marginInline: theme.spacing(10),
      },
      "& > label": {
        marginTop: theme.spacing(3),
      },
    },

    marginTop: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(10),
    },

    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      backgroundColor: "#ff5722",
      fontSize: "xx-large",
      alignItems: "flex-start",
    },
  })
);

interface IProps {
  setPending: (arg: boolean) => void;
}

const EditUser: FC<IProps> = ({ setPending }) => {
  const classes = useStyle();
  const requiredField = useAppSelector(selectRequiredField);
  const methods = useForm();
  const { handleSubmit, watch, setValue } = methods;
  const [avatar, setAvatar] = useState<Blob | string>("");
  const [nationalIdDoc, setNationalIdDoc] = useState<Blob | string>("");
  const dispatch = useAppDispatch();
  const [checkNIdAl, setCheckNIdAl] = useState(false);
  const dataGrid = new FormData();
  const patientId = useAppSelector(selectPatientId);

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
      setPending(true);
      const axiosPromise = new Promise((sent, rejected) => {
        axios
          .patch(`https://localhost:5001/api/patients/${patientId}`, dataGrid)
          .then((res) => {
            console.log(res);
            if ((res.status = 204)) {
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
          .finally(() => setPending(false));
      });

      await axiosPromise;
    }
  };

  const avatarFirstLetter = requiredField.FamilyName.charAt(0);

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Grid container justify="space-around" className={classes.marginTop}>
          <Avatar
            variant="rounded"
            alt="Avatar"
            src={requiredField.AvatarLink}
            className={classes.avatar}
          >
            {avatarFirstLetter}
          </Avatar>
          <Button
            target="_blank"
            href={requiredField.NationalIdDoc}
            rel="noreferrer"
            startIcon={<Assignment />}
            size="large"
            color="primary"
            variant="outlined"
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

        <Grid item className={classes.form}>
          {/* ------------------------ Names ------------------------ */}
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

          {/* ------------------------ NumericFields ------------------------ */}
          <NumericFields
            checkNIdAl={checkNIdAl}
            setCheckNIdAl={setCheckNIdAl}
          />

          {/* ------------------------ requiredFilesFields ------------------------ */}
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
              ویرایش
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default EditUser;
