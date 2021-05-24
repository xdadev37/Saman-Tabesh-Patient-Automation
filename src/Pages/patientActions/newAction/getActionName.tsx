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
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import AddFiles from "./AddFilesForm/optionalFields";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/alertMessageSlice";

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
  const [actionId, setActionId] = useState(0);
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
          .then((res) => {
            if ((res.status = 201)) {
              setActionId(res.data.id);
              submitted(setCompletedStatus(true));
            } else {
              dispatch(setAlertText("ثبت اطلاعات انجام نشد!"));
              dispatch(setAlertStatus("error"));

              failed(dispatch(setOpen(true)));
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch(setAlertText("خطای سرور!"));
            dispatch(setAlertStatus("error"));

            failed(dispatch(setOpen(true)));
          });
      });
      await submit;
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
        <AddFiles newActionName={newActionName} actionId={actionId} />
      ) : (
        <Dialog fullScreen open={true}>
          {modalEntry}
        </Dialog>
      )}
    </Fragment>
  );
};

export default GetActionName;
