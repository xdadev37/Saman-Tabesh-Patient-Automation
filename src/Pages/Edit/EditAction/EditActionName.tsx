import { FC, ChangeEvent, useState, Fragment, useEffect } from "react";
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
import { Close, Check } from "@material-ui/icons";
import { patch } from "../../../tokenAuth";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import {
  selectActionId,
  selectActionName,
} from "../../../Redux/Slicer/editActionSlice";
import EditFiles from "./EditActionFiles/EditActionFiles";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import { setBackdrop } from "../../../Redux/Slicer/backdropSlice";
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
  const [completedStatus, setCompletedStatus] = useState(false);
  const selectId = useAppSelector(selectPatientId);
  const actionId = useAppSelector(selectActionId);
  const actionName = useAppSelector(selectActionName);
  const [newActionName, setNewActionName] = useState(actionName);
  const classes = modal();

  useEffect(() => {
    dispatch(setOpen(false));
  }, [dispatch]);

  const newActionSubmit = async () => {
    if (newActionName !== "") {
      dispatch(setBackdrop());
      const submit = new Promise((submitted, failed) => {
        patch
          .patch(`http://localhost:3003/actionName/${actionId}`, {
            Name: newActionName,
            PatientId: selectId,
          })
          .then((res) => {
            if ((res.status = 200)) {
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
          })
          .finally(() => dispatch(setBackdrop()));
      });
      await submit;
    }
  };

  const modalEntry = (
    <Fragment>
      <AppBar>
        <Toolbar>
          <Grid container justify="space-between">
            <IconButton onClick={() => dispatch(setActionForm("checkAction"))}>
              <Close />
            </IconButton>
            <Typography variant="h6">{`تغییر اقدام ${actionName}`}</Typography>
            <Button
              variant="contained"
              onClick={() => dispatch(setActionForm("checkAction"))}
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
            defaultValue={actionName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setNewActionName(event.target.value);
            }}
          />
          <hr />
          <Button
            variant="contained"
            color="primary"
            onClick={newActionSubmit}
            startIcon={<Check />}
          >
            ثبت رویداد
          </Button>
        </Grid>
      </List>
    </Fragment>
  );

  return (
    <Fragment>
      {completedStatus ? (
        <EditFiles
          newActionName={newActionName}
          actionId={actionId}
          setCompletedStatus={setCompletedStatus}
        />
      ) : (
        <Dialog fullScreen open={true}>
          {modalEntry}
        </Dialog>
      )}
    </Fragment>
  );
};

export default GetActionName;
