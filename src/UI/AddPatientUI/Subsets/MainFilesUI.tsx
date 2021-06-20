import { FormHelperText, Typography, Button, Grid } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import { useAppSelector } from "../../../Redux/hook";
import { selectDarkMode } from "../../../Redux/Slicer/GlobalReduxUIState/darkModeSlice";
import FilesFields from "../../../Pages/patientActions/newAction/AddFilesForm/FileMapper/FilesFields/filesFields";
import WebcamImage from "../../../Pages/AddPatientPage/AddFormDescenders/Webcam/webcamImage";

interface IProps {
  setNationalIdDoc: (arg: Blob) => void;
  setCommitmentDoc: (arg: Blob) => void;
  setPolicyDoc: (arg: Blob) => void;
  setTab: (arg: number) => void;
  setVideoSrc: (arg: HTMLVideoElement) => void;
}

const MainFilesUI: React.FC<IProps> = ({
  setNationalIdDoc,
  setCommitmentDoc,
  setPolicyDoc,
  setTab,
  setVideoSrc,
}) => {
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Grid container id="mainFilesUI">
      <Grid container>
        <WebcamImage setVideoSrc={setVideoSrc} />
      </Grid>
      <hr
        style={{
          width: "100%",
          marginBottom: 40,
          marginTop: 40,
          border: "0.0001px groove #000",
        }}
      />
      <Grid container>
        <FilesFields
          id="NationalIdCard"
          title="کارت ملی :"
          func={setNationalIdDoc}
        />
        <FilesFields
          id="commitmentDoc"
          title="فرم رضایت بیمار :"
          func={setCommitmentDoc}
        />
        <FilesFields
          id="DiagnosisIdDoc"
          title="فرم پذیرش شرایط بخش :"
          func={setPolicyDoc}
        />
      </Grid>
      <Grid item>
        <FormHelperText
          style={{ width: "320px", color: darkMode ? "#fff" : "#000" }}
        >
          <Typography variant="subtitle2" component="span">
            حداکثر حجم فایل مجاز : 300 کیلوبایت
            <br />
            فرمت فایل قابل قبول : PDF
          </Typography>
        </FormHelperText>
      </Grid>

      <Grid container justify="flex-end">
        <Button
          onClick={() => setTab(3)}
          endIcon={<ChevronLeft />}
          variant="contained"
          color="primary"
          style={{ width: "10%" }}
        >
          بعدی
        </Button>
      </Grid>
    </Grid>
  );
};

export default MainFilesUI;
