import { FC, ChangeEvent } from "react";
import {
  Grid,
  Typography,
  InputLabel,
  TextField,
  FormHelperText,
  Button,
} from "@material-ui/core";
import { Check, BorderColor } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FileMapper from "../Pages/patientActions/newAction/AddFilesForm/FileMapper/FileMapper";
import InfoBar from "./InfoBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(10),
    },

    button: {
      margin: theme.spacing(5),
      float: "right",
      width: "30%",
    },

    marginY: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },

    span: { marginInline: "10px", fontWeight: "normal" },
    label: { width: "320px", color: "#000" },
  })
);

interface IProps {
  submit: () => void;
  newActionName: string;
  setUserComment: (arg: string) => void;
  setPathologyDoc: (arg: Blob) => void;
  setTreatmentDoc: (arg: Blob) => void;
  setCommitmentDoc: (arg: Blob) => void;
  setMRIReportDoc: (arg: Blob) => void;
  setCTReportDoc: (arg: Blob) => void;
  setPETReportDoc: (arg: Blob) => void;
  setSonoReportDoc: (arg: Blob) => void;
  setMamoReportDoc: (arg: Blob) => void;
  setLabReportDoc: (arg: Blob) => void;
  actionComment: string;
  setCompletedStatus: (arg: boolean) => void;
}

const FileForm: FC<IProps> = ({
  submit,
  newActionName,
  setUserComment,
  setPathologyDoc,
  setTreatmentDoc,
  setCommitmentDoc,
  setMRIReportDoc,
  setCTReportDoc,
  setPETReportDoc,
  setSonoReportDoc,
  setMamoReportDoc,
  setLabReportDoc,
  actionComment,
  setCompletedStatus,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} direction="column">
      <Grid container justify="space-around" alignItems="baseline">
        <Grid item>
          <Typography variant="body1">
            <span style={{ color: "#2962ff" }}>موضوع : </span>
            {newActionName}
          </Typography>
          <Button
            style={{ marginTop: 10 }}
            variant="outlined"
            color="secondary"
            onClick={() => setCompletedStatus(false)}
          >
            تغییر دوباره نام اقدام
          </Button>
        </Grid>
        <InfoBar />
      </Grid>

      {/* Files */}
      <Grid item className={classes.marginY}>
        <hr style={{ marginBottom: 30 }} />
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
      </Grid>

      {/* Comment */}
      <Grid item>
        <hr />
        <InputLabel className={classes.label}>
          <BorderColor />
          <span className={classes.span}>توضیحات</span>
        </InputLabel>
        <TextField
          className={classes.marginY}
          autoComplete="off"
          label="توضیحات تکمیلی"
          variant="filled"
          multiline
          rows={7}
          fullWidth
          defaultValue={actionComment}
          inputProps={{ maxLength: 800 }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUserComment(event.target.value);
          }}
        />
        <FormHelperText>
          <Typography
            variant="subtitle2"
            component="span"
            className={classes.label}
          >
            راهنما :
            <br />
            حداکثر تعداد کاراکتر مجاز : 800
            <br />
            در آخر برای ثبت نهایی دکمه ثبت را بفشارید
          </Typography>
        </FormHelperText>
        <Button
          className={classes.button}
          variant="contained"
          onClick={submit}
          color="primary"
          startIcon={<Check />}
        >
          ثبت
        </Button>
      </Grid>
    </Grid>
  );
};

export default FileForm;
