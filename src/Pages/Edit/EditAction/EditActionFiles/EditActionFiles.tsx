import { FC, ChangeEvent, useState } from "react";
import {
  FormHelperText,
  Grid,
  Button,
  TextField,
  InputLabel,
  Typography,
  Avatar,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FileMapper from "../../../patientActions/newAction/AddFilesForm/FileMapper/FileMapper";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import axios from "axios";
import { selectPatientId } from "../../../../Redux/Slicer/idPasserSlice";
import { selectActionComment } from "../../../../Redux/Slicer/editActionSlice";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../../Redux/Slicer/alertMessageSlice";
import { setActionForm } from "../../../../Redux/Slicer/actionStatusSlice";
import { Check, BorderColor } from "@material-ui/icons";
import { selectRequiredField } from "../../../../Redux/Slicer/patientInfoSlice";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(10),
      "& > * > label": {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
      },
    },
    button: {
      margin: theme.spacing(5),
      float: "right",
      width: "30%",
    },
  })
);

interface IProps {
  newActionName: string;
  actionId: number;
  setPending: (arg: boolean) => void;
}

const OptionalFields: FC<IProps> = ({
  newActionName,
  actionId,
  setPending,
}) => {
  const dispatch = useAppDispatch();
  const classes = styles();
  const selectId = useAppSelector(selectPatientId);
  const actionComment = useAppSelector(selectActionComment);
  const [userComment, setUserComment] = useState(actionComment);
  const tempData = useAppSelector(selectRequiredField);
  const [PathologyDoc, setPathologyDoc] = useState<object | string>("");
  const [TreatmentDoc, setTreatmentDoc] = useState<object | string>("");
  const [CommitmentDoc, setCommitmentDoc] = useState<object | string>("");
  const [MRIReportDoc, setMRIReportDoc] = useState<object | string>("");
  const [CTReportDoc, setCTReportDoc] = useState<object | string>("");
  const [PETReportDoc, setPETReportDoc] = useState<object | string>("");
  const [SonoReportDoc, setSonoReportDoc] = useState<object | string>("");
  const [MamoReportDoc, setMamoReportDoc] = useState<object | string>("");
  const [LabReportDoc, setLabReportDoc] = useState<object | string>("");

  const dispatchData = async () => {
    setPending(true);
    const dispatcher = new Promise((sent, rejected) => {
      axios
        .patch(`http://localhost:3001/optionalForm/${actionId}`, {
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
          if ((res.status = 200)) {
            dispatch(setAlertText("تغییرات با موفقیت ثبت شد"));
            dispatch(setAlertStatus("success"));
            dispatch(setActionForm("checkAction"));

            sent(dispatch(setOpen(true)));
          } else {
            dispatch(setAlertText("ثبت اطلاعات انجام نشد"));
            dispatch(setAlertStatus("error"));

            rejected(dispatch(setOpen(true)));
          }
        })
        .catch((error) => {
          console.log(error.request);
          dispatch(setAlertText(error.request.responseText));
          dispatch(setAlertStatus("error"));

          rejected(dispatch(setOpen(true)));
        })
        .finally(() => setPending(false));
    });

    await dispatcher;
  };

  const avatarFirstLetter = tempData.FamilyName.charAt(0);

  return (
    <Grid
      container
      className={classes.root}
      alignContent="center"
      justify="center"
    >
      <Grid
        container
        sm={12}
        md={12}
        lg={12}
        justify="space-around"
        style={{ marginBottom: "30px" }}
      >
        <Typography variant="h6" color="secondary">
          {`نام اقدام : ${newActionName}`}
        </Typography>
        <Avatar alt="avatar" src={tempData.AvatarLink}>
          {avatarFirstLetter}
        </Avatar>
        <Typography>{tempData.Name}</Typography>
        <Typography>{tempData.FamilyName}</Typography>
        <Typography>{tempData.NationalId}</Typography>
        <Typography>{tempData.FileNumber}</Typography>
      </Grid>

      {/* Files */}
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

      {/* Comment */}
      <Grid item sm={12} md={12} lg={12}>
        <hr />
        <InputLabel style={{ width: "320px", color: "#000" }}>
          <BorderColor />
          <span style={{ marginInline: "10px", fontWeight: "normal" }}>
            توضیحات
          </span>
        </InputLabel>
        <TextField
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
            style={{ width: "320px", color: "#000" }}
          >
            راهنما :
            <br />
            حداکثر تعداد کاراکتر مجاز : 800
            <br />
            در آخر برای ثبت نهایی دکمه ثبت را بفشارید
          </Typography>
        </FormHelperText>
      </Grid>
      <Grid item sm={10} md={10} lg={10}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={dispatchData}
          color="primary"
          startIcon={<Check />}
        >
          ثبت
        </Button>
      </Grid>
    </Grid>
  );
};

export default OptionalFields;