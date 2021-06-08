import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Check } from "@material-ui/icons";
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
  })
);

interface IProps {
  submit: () => void;
  newActionName: string;
  setPathologyDoc: (arg: Blob) => void;
  setTreatmentDoc: (arg: Blob) => void;
  setCommitmentDoc: (arg: Blob) => void;
  setMRIReportDoc: (arg: Blob) => void;
  setCTReportDoc: (arg: Blob) => void;
  setPETReportDoc: (arg: Blob) => void;
  setSonoReportDoc: (arg: Blob) => void;
  setMamoReportDoc: (arg: Blob) => void;
  setLabReportDoc: (arg: Blob) => void;
  setCompletedStatus: (arg: boolean) => void;
}

const FileForm: React.FC<IProps> = ({
  submit,
  newActionName,
  setPathologyDoc,
  setTreatmentDoc,
  setCommitmentDoc,
  setMRIReportDoc,
  setCTReportDoc,
  setPETReportDoc,
  setSonoReportDoc,
  setMamoReportDoc,
  setLabReportDoc,
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
              موضوع : &nbsp;
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

      <Grid item>
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
