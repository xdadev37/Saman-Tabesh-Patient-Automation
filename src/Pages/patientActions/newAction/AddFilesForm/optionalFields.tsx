import { FC, ChangeEvent, useState } from "react";
import {
  FormHelperText,
  Grid,
  Button,
  TextField,
  InputLabel,
  Typography,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FileMapper from "./FileMapper/FileMapper";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import axios from "axios";
import { selectPatientId } from "../../../../Redux/Slicer/idPasserSlice";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../../Redux/Slicer/alertMessageSlice";
import { setActionForm } from "../../../../Redux/Slicer/actionStatusSlice";
import { Check, BorderColor } from "@material-ui/icons";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(10),
      "& > * > label": {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
      },
    },
    button: {
      margin: theme.spacing(5),
      float: "right",
      width: "30%",
    },
  })
);

interface IProps {
  newActionName: string;
  actionId: number;
}

const OptionalFields: FC<IProps> = ({ newActionName, actionId }) => {
  const dispatch = useAppDispatch();
  const classes = styles();
  const [userComment, setUserComment] = useState("");
  const [PathologyDoc, setPathologyDoc] = useState<object | string>("");
  const [TreatmentDoc, setTreatmentDoc] = useState<object | string>("");
  const [CommitmentDoc, setCommitmentDoc] = useState<object | string>("");
  const [MRIReportDoc, setMRIReportDoc] = useState<object | string>("");
  const [CTReportDoc, setCTReportDoc] = useState<object | string>("");
  const [PETReportDoc, setPETReportDoc] = useState<object | string>("");
  const [SonoReportDoc, setSonoReportDoc] = useState<object | string>("");
  const [MamoReportDoc, setMamoReportDoc] = useState<object | string>("");
  const [LabReportDoc, setLabReportDoc] = useState<object | string>("");
  const selectId = useAppSelector(selectPatientId);
  const [pending, setPending] = useState(false);

  const dispatchData = async () => {
    setPending(true);
    const comment = new Promise((sent, rejected) => {
      axios
        .post("http://localhost:3001/optionalForm", {
          Name: newActionName,
          ActionId: actionId,
          PatientId: selectId,
          PathologyDoc: PathologyDoc,
          TreatmentDoc: TreatmentDoc,
          CommitmentDoc: CommitmentDoc,
          MRIReportDoc: MRIReportDoc,
          CTReportDoc: CTReportDoc,
          PETReportDoc: PETReportDoc,
          SonoReportDoc: SonoReportDoc,
          MamoReportDoc: MamoReportDoc,
          LabReportDoc: LabReportDoc,
          Comment: userComment,
        })
        .then((res) => {
          if ((res.status = 201)) {
            dispatch(setAlertText("رویداد با موفقیت ثبت شد."));
            dispatch(setAlertStatus("success"));
            dispatch(setActionForm("mainPage"));

            sent(dispatch(setOpen(true)));
          } else {
            dispatch(setAlertText("ثبت اطلاعات انجام نشد!"));
            dispatch(setAlertStatus("error"));
            dispatch(setOpen(true));

            rejected(setPending(false));
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch(setAlertText("خطای سرور!"));
          dispatch(setAlertStatus("error"));
          dispatch(setOpen(true));

          rejected(setPending(false));
        });
    });

    await comment;
  };

  return (
    <Grid
      container
      className={classes.root}
      alignContent="center"
      justify="center"
    >
      {/* Files */}
      <FileMapper
        setPathologyDoc={setPathologyDoc}
        setTreatmentDoc={setTreatmentDoc}
        setCommitmentDoc={setCommitmentDoc}
        setMRIReportDoc={setMRIReportDoc}
        setCTReportDoc={setCTReportDoc}
        setPETReportDoc={setPETReportDoc}
        setSonoReportDoc={setSonoReportDoc}
        setMamoReportDoc={setMamoReportDoc}
        setLabReportDoc={setLabReportDoc}
      />

      {/* Comment */}
      <Grid item sm={12} md={12} lg={12}>
        <hr />
        <InputLabel style={{ width: "320px", color: "#000" }}>
          <BorderColor />
          <span style={{ marginInline: "10px" }}>توضیحات</span>
        </InputLabel>
        <TextField
          autoComplete="off"
          label="توضیحات تکمیلی"
          variant="filled"
          multiline
          rows={7}
          fullWidth
          inputProps={{ maxLength: 800 }}
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            setUserComment(event.target.value);
          }}
        />
        <FormHelperText>
          <Typography
            variant="subtitle2"
            component="span"
            style={{ width: "320px", color: "#000" }}
          >
            راهنما :
            <br />
            حداکثر تعداد کاراکتر مجاز : 800
            <br />
            در آخر برای ثبت نهایی دکمه ثبت را بفشارید
          </Typography>
        </FormHelperText>
      </Grid>
      <Grid item sm={10} md={10} lg={10}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={dispatchData}
          color="primary"
          startIcon={<Check />}
        >
          ثبت
        </Button>
      </Grid>
      <Backdrop open={pending}>
        <CircularProgress />
      </Backdrop>
    </Grid>
  );
};

export default OptionalFields;
