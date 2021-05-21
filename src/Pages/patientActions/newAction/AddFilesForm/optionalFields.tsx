import { FC, ChangeEvent, useState } from "react";
import {
  FormHelperText,
  Grid,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { CheckCircle, Cancel } from "@material-ui/icons";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FilesFields from "./filesFields";
import { useAppSelector } from "../../../../Redux/hook";
import axios from "axios";
import { selectFiletId } from "../../../../Redux/Slicer/idPasserSlice";
import { dataArrayOptional } from "../../../AddPatientPage/dataArray";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(10),
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    button: {
      margin: theme.spacing(5),
    },
  })
);

const OptionalFields: FC = () => {
  const fileId = useAppSelector(selectFiletId);
  const [userComment, setUserComment] = useState("");
  const classes = styles();
  const [sendStatus, setSendStatus] = useState(false);
  const [PathologyDoc, setPathologyDoc] = useState({});
  const [TreatmentDoc, setTreatmentDoc] = useState({});
  const [CommitmentDoc, setCommitmentDoc] = useState({});
  const [MRIReportDoc, setMRIReportDoc] = useState({});
  const [CTReportDoc, setCTReportDoc] = useState({});
  const [PETReportDoc, setPETReportDoc] = useState({});
  const [SonoReportDoc, setSonoReportDoc] = useState({});
  const [MamoReportDoc, setMamoReportDoc] = useState({});
  const [LabReportDoc, setLabReportDoc] = useState({});

  const dispatchData = async () => {
    const comment = new Promise((sent, rejected) => {
      axios
        .post("http://localhost:3001/optionalForm", {
          // Name: newActionName,
          // ActionId: actionId,
          // PatientId: selectId,
          PathologyDoc: "",
          TreatmentDoc: "",
          CommitmentDoc: "",
          MRIReportDoc: "",
          CTReportDoc: "",
          PETReportDoc: "",
          SonoReportDoc: "",
          MamoReportDoc: "",
          LabReportDoc: "",
          Comment: "",
        })
        .then((res) => {
          if ((res.status = 201)) {
            console.log("کامنت رفت", res.statusText);
            sent(setSendStatus(true));
          } else {
            console.log("کامنت نرفت");
            rejected(setSendStatus(false));
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
      direction="column"
    >
      {/* Files */}
      <FilesFields id={id} title={title} func={func} />
      <FilesFields id={id} title={title} func={func} />
      <FilesFields id={id} title={title} func={func} />
      <FilesFields id={id} title={title} func={func} />
      <FilesFields id={id} title={title} func={func} />
      <FilesFields id={id} title={title} func={func} />
      <FilesFields id={id} title={title} func={func} />
      <FilesFields id={id} title={title} func={func} />
      <FilesFields id={id} title={title} func={func} />
      {/* Comment */}
      <Grid container direction="column">
        <TextField
          autoComplete="off"
          label="توضیحات"
          variant="filled"
          multiline
          rows={7}
          inputProps={{ maxLength: 800 }}
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            setUserComment(event.target.value);
          }}
          helperText={<hr />}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {sendStatus ? (
                  <CheckCircle color="primary" />
                ) : (
                  <Cancel color="error" />
                )}
              </InputAdornment>
            ),
          }}
        />
        <FormHelperText>
          <Typography>حداکثر تعداد کاراکتر مجاز : 800</Typography>
          <Typography>
            در آخر برای ثبت نهایی دکمه ثبت توضیحات را بفشارید
          </Typography>
        </FormHelperText>
      </Grid>
      <Button
        className={classes.button}
        variant="contained"
        onClick={dispatchData}
        color="primary"
      >
        تمام
      </Button>
    </Grid>
  );
};

export default OptionalFields;
