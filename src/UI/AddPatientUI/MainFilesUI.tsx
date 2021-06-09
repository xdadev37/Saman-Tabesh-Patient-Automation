import { FC, Fragment } from "react";
import ImageValidating from "../../Pages/AddPatientPage/AddFormDescenders/imageValidating";
import FilesFields from "../../Pages/patientActions/newAction/AddFilesForm/FileMapper/FilesFields/filesFields";
import { FormHelperText, Typography, Button } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import { useAppSelector } from "../../Redux/hook";
import { selectDarkMode } from "../../Redux/Slicer/darkModeSlice";

interface IProps {
  setAvatar: (arg: Blob) => void;
  setNationalIdDoc: (arg: Blob) => void;
  setCommitmentDoc: (arg: Blob) => void;
  setPolicyDoc: (arg: Blob) => void;
}

const MainFilesUI: FC<IProps> = ({
  setAvatar,
  setNationalIdDoc,
  setCommitmentDoc,
  setPolicyDoc,
}) => {
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Fragment>
      <ImageValidating setAvatar={setAvatar} />
      <hr />
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

      <FormHelperText
        style={{ width: "320px", color: darkMode ? "#fff" : "#000" }}
      >
        <Typography variant="subtitle2" component="span">
          حداکثر حجم فایل مجاز : 300 کیلوبایت
          <br />
          فرمت فایل قابل قبول : PDF
        </Typography>
      </FormHelperText>

      <Button
        endIcon={<ChevronLeft />}
        variant="contained"
        color="primary"
        style={{ width: "10%" }}
      >
        بعدی
      </Button>
    </Fragment>
  );
};

export default MainFilesUI;
