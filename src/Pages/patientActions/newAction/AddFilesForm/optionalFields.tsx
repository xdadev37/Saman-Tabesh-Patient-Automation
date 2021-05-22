import { FC, ChangeEvent, useState } from "react";
import { FormHelperText, Grid, Button, TextField } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FilesFields from "./filesFields";
import { useAppSelector } from "../../../../Redux/hook";
import axios from "axios";
import { selectPatientId } from "../../../../Redux/Slicer/idPasserSlice";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(10),
      "& > * > *": {
        marginTop: theme.spacing(5),
      },
    },
    button: {
      margin: theme.spacing(5),
      float: "right",
    },
  })
);

interface IProps {
  newActionName: string;
  actionId: number;
}

const OptionalFields: FC<IProps> = ({ newActionName, actionId }) => {
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

  const dispatchData = async () => {
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
            console.log("فایل رفت", res.statusText);
            sent(window.location.reload());
          } else {
            rejected(console.log("فایل نرفت", res.statusText));
          }
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
      <Grid item sm={6} md={6} lg={6}>
        <FilesFields
          id="PathologyDoc"
          title="برگ پاتولوژی"
          func={setPathologyDoc}
        />
        <FilesFields
          id="TreatmentDoc"
          title="کارت درمان"
          func={setTreatmentDoc}
        />
        <FilesFields
          id="CommitmentDoc"
          title="فرم رضایت بیمار"
          func={setCommitmentDoc}
        />
        <FilesFields
          id="MRIReportDoc"
          title="گزارش MRI"
          func={setMRIReportDoc}
        />
        <FilesFields id="CTReportDoc" title="گزارش CT" func={setCTReportDoc} />
      </Grid>
      <Grid item sm={6} md={6} lg={6}>
        <FilesFields
          id="PETReportDoc"
          title="گزارش PET"
          func={setPETReportDoc}
        />
        <FilesFields
          id="SonoReportDoc"
          title="گزارش سونو"
          func={setSonoReportDoc}
        />
        <FilesFields
          id="MamoReportDoc"
          title="گزارش ماموگرافی"
          func={setMamoReportDoc}
        />
        <FilesFields
          id="LabReportDoc"
          title="گزارشات آزمایشگاهی"
          func={setLabReportDoc}
        />
      </Grid>
      {/* Comment */}
      <Grid item sm={12} md={12} lg={12}>
        <hr />
        <TextField
          autoComplete="off"
          label="توضیحات"
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
          حداکثر تعداد کاراکتر مجاز : 800
          <br />
          در آخر برای ثبت نهایی دکمه ثبت را بفشارید
        </FormHelperText>
      </Grid>
      <Grid item sm={10} md={10} lg={10}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={dispatchData}
          color="primary"
        >
          ثبت
        </Button>
      </Grid>
    </Grid>
  );
};

export default OptionalFields;
