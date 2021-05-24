import { FC, Fragment } from "react";
import { Grid } from "@material-ui/core";
import FilesFields from "./FilesFields/filesFields";

interface IProps {
  setPathologyDoc: (arg: object) => void;
  setTreatmentDoc: (arg: object) => void;
  setCommitmentDoc: (arg: object) => void;
  setMRIReportDoc: (arg: object) => void;
  setCTReportDoc: (arg: object) => void;
  setPETReportDoc: (arg: object) => void;
  setSonoReportDoc: (arg: object) => void;
  setMamoReportDoc: (arg: object) => void;
  setLabReportDoc: (arg: object) => void;
}

const FileMapper: FC<IProps> = ({
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
    <Fragment>
      <Grid item sm={6} md={6} lg={6}>
        <FilesFields
          id="PathologyDoc"
          title="> برگ پاتولوژی :"
          func={setPathologyDoc}
        />
        <FilesFields
          id="TreatmentDoc"
          title="> کارت درمان :"
          func={setTreatmentDoc}
        />
        <FilesFields
          id="CommitmentDoc"
          title="> فرم رضایت بیمار :"
          func={setCommitmentDoc}
        />
        <FilesFields
          id="MRIReportDoc"
          title="> گزارش MRI :"
          func={setMRIReportDoc}
        />
        <FilesFields
          id="CTReportDoc"
          title="> گزارش CT :"
          func={setCTReportDoc}
        />
      </Grid>
      <Grid item sm={6} md={6} lg={6}>
        <FilesFields
          id="PETReportDoc"
          title="> گزارش PET :"
          func={setPETReportDoc}
        />
        <FilesFields
          id="SonoReportDoc"
          title="> گزارش سونو :"
          func={setSonoReportDoc}
        />
        <FilesFields
          id="MamoReportDoc"
          title="> گزارش ماموگرافی :"
          func={setMamoReportDoc}
        />
        <FilesFields
          id="LabReportDoc"
          title="> گزارشات آزمایشگاهی :"
          func={setLabReportDoc}
        />
      </Grid>
    </Fragment>
  );
};

export default FileMapper;
