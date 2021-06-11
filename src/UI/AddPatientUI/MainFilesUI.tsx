import ImageValidating from "../../Pages/AddPatientPage/AddFormDescenders/imageValidating";
import FilesFields from "../../Pages/patientActions/newAction/AddFilesForm/FileMapper/FilesFields/filesFields";
import { FormHelperText, Typography, Button, Grid } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import { useAppSelector } from "../../Redux/hook";
import { selectDarkMode } from "../../Redux/Slicer/darkModeSlice";
import WebcamImage from "../../Pages/AddPatientPage/AddFormDescenders/webcamImage";

interface IProps {
  setAvatar: (arg: Blob) => void;
  setNationalIdDoc: (arg: Blob) => void;
  setCommitmentDoc: (arg: Blob) => void;
  setPolicyDoc: (arg: Blob) => void;
  setValue: (arg: number) => void;
}

const MainFilesUI: React.FC<IProps> = ({
  setAvatar,
  setNationalIdDoc,
  setCommitmentDoc,
  setPolicyDoc,
  setValue,
}) => {
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Grid container>
      <Grid item>
        {/* <ImageValidating setAvatar={setAvatar} /> */}
        <WebcamImage />
        <hr />
      </Grid>
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
          id="diagnosisDoc"
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
          onClick={() => setValue(3)}
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
