import { FC, ChangeEvent, useState, Fragment } from "react";
import {
  Button,
  Paper,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  TextField,
  Grid,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  selectPatientId,
  setFileId,
} from "../../../Redux/Slicer/idPasserSlice";
import AddFiles from "./AddFilesForm/optionalFields";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";

const modal = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      margin: theme.spacing(10),
      width: "30%",
      height: theme.spacing(10),
    },
  })
);

const GetActionName: FC = () => {
  const dispatch = useAppDispatch();
  const [newActionName, setNewActionName] = useState("");
  const [actionId, setActionId] = useState();
  const [completedStatus, setCompletedStatus] = useState(false);
  const selectId = useAppSelector(selectPatientId);
  const classes = modal();

  const newActionSubmit = async () => {
    if (newActionName !== "") {
      const submit = new Promise((submitted, failed) => {
        axios
          .post("http://localhost:3003/actionName", {
            Name: newActionName,
            PatientId: selectId,
          })
          .then(async (res) => {
            if ((res.status = 201)) {
              setActionId(res.data.id);
              await axios
                .post("http://localhost:3001/optionalForm", {
                  Name: newActionName,
                  ActionId: actionId,
                  PatientId: selectId,
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
                    console.log(res.data.id);
                    dispatch(setFileId(res.data.id));
                    submitted(setCompletedStatus(true));
                  } else {
                    failed(
                      console.log("patientFile Creating Failed", res.statusText)
                    );
                  }
                })
                .catch((error) => {
                  failed(console.log(error));
                });
            } else {
              failed(console.log("newAction Failed", res.statusText));
            }
          })
          .catch((error) => {
            failed(console.log(error));
          });
      });

      await submit;
    } else {
      return;
    }
  };

  const modalEntry = (
    <Fragment>
      <AppBar>
        <Toolbar>
          <Grid container justify="space-between">
            <IconButton onClick={() => dispatch(setActionForm("mainPage"))}>
              <Close />
            </IconButton>
            <Typography variant="h6">ایجاد اقدام جدید</Typography>
            <Button
              variant="contained"
              onClick={() => dispatch(setActionForm("mainPage"))}
              color="secondary"
            >
              خروج
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <List component={Paper}>
        <Grid item className={classes.modal}>
          <TextField
            label="نام رویداد"
            required
            variant="filled"
            onSelect={(event: ChangeEvent<HTMLInputElement>) => {
              setNewActionName(event.target.value);
            }}
          />
          <hr />
          <Button variant="contained" color="primary" onClick={newActionSubmit}>
            ثبت رویداد
          </Button>
        </Grid>
      </List>
    </Fragment>
  );

  return (
    <Fragment>
      {completedStatus ? (
        <AddFiles />
      ) : (
        <Dialog fullScreen open={true}>
          {modalEntry}
        </Dialog>
      )}
    </Fragment>
  );
};

export default GetActionName;
