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
import { useAppSelector } from "../Redux/hook";
import { selectDarkMode } from "../Redux/Slicer/darkModeSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Grid container direction="column">
      <Grid container justify="space-around" alignItems="baseline">
        <Grid item>
          <Typography variant="body1">
            <span style={{ color: darkMode ? "#fff" : "#2962ff" }}>
              موضوع :{" "}
            </span>
            {newActionName}
          </Typography>
          <Button
            style={{ marginTop: 10 }}
            variant={darkMode ? "contained" : "outlined"}
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
        <InputLabel
          style={{ width: "320px", color: darkMode ? "#fff" : "#2962ff" }}
        >
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
            style={{ width: "320px", color: darkMode ? "#fff" : "#000" }}
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
