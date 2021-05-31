import { Grid } from "@material-ui/core";
import FilesFields from "./FilesFields/filesFields";

interface IProps {
  setPathologyDoc: (arg: Blob) => void;
  setTreatmentDoc: (arg: Blob) => void;
  setCommitmentDoc: (arg: Blob) => void;
  setMRIReportDoc: (arg: Blob) => void;
  setCTReportDoc: (arg: Blob) => void;
  setPETReportDoc: (arg: Blob) => void;
  setSonoReportDoc: (arg: Blob) => void;
  setMamoReportDoc: (arg: Blob) => void;
  setLabReportDoc: (arg: Blob) => void;
}

const FileMapper: React.FC<IProps> = ({
  setPathologyDoc,
  setTreatmentDoc,
  setCommitmentDoc,
  setMRIReportDoc,
  setCTReportDoc,
  setPETReportDoc,
  setSonoReportDoc,
  setMamoReportDoc,
  setLabReportDoc,
}) => {
  return (
    <Grid container justify="space-around">
      <Grid item>
        <FilesFields
          id="PathologyDoc"
          title="برگ پاتولوژی :"
          func={setPathologyDoc}
        />
        <FilesFields
          id="TreatmentDoc"
          title="کارت درمان :"
          func={setTreatmentDoc}
        />
        <FilesFields
          id="CommitmentDoc"
          title="فرم رضایت بیمار :"
          func={setCommitmentDoc}
        />
        <FilesFields
          id="MRIReportDoc"
          title="گزارش MRI :"
          func={setMRIReportDoc}
        />
        <FilesFields
          id="CTReportDoc"
          title="گزارش CT :"
          func={setCTReportDoc}
        />
      </Grid>
      <Grid item>
        <FilesFields
          id="PETReportDoc"
          title="گزارش PET :"
          func={setPETReportDoc}
        />
        <FilesFields
          id="SonoReportDoc"
          title="گزارش سونو :"
          func={setSonoReportDoc}
        />
        <FilesFields
          id="MamoReportDoc"
          title="گزارش ماموگرافی :"
          func={setMamoReportDoc}
        />
        <FilesFields
          id="LabReportDoc"
          title="گزارشات آزمایشگاهی :"
          func={setLabReportDoc}
        />
      </Grid>
    </Grid>
  );
};

export default FileMapper;
