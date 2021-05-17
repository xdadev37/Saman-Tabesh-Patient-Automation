import { FC, ChangeEvent, useState, Fragment } from "react";
import {
  Modal,
  Button,
  makeStyles,
  createStyles,
  Theme,
  Input,
  InputLabel,
  Paper,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectPatientId, setFileId } from "../../Redux/Slicer/idPasserSlice";
import AddFiles from "./AddFilesForm/optionalFields";

const modal = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      backgroundColor: theme.palette.grey[300],
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
    const submit = new Promise((submitted, failed) => {
      // if (newActionName !== "") {}
      axios
        .post("http://localhost:3003/actionName", {
          Name: newActionName,
          PatientId: selectId,
        })
        .then(async (res) => {
          if ((res.status = 201)) {
            console.log(res.data.id);
            setActionId(res.data.id);
            await axios
              .post("http://localhost:3001/optionalForm", {
                ActionId: actionId,
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
  };

  const modalEntry = (
    <Grid
      container
      justify="center"
      component={Paper}
      className={classes.modal}
      alignItems="center"
    >
      <form autoComplete="off">
        <InputLabel htmlFor="action">نام رویداد</InputLabel>
        <Input
          placeholder="نام رویداد را وارد کنید"
          required
          id="action"
          onSelect={(event: ChangeEvent<HTMLInputElement>) => {
            setNewActionName(event.target.value);
          }}
        />
        <Button onClick={newActionSubmit}>ثبت رویداد</Button>
      </form>
    </Grid>
  );

  return (
    <Fragment>
      {completedStatus ? <AddFiles /> : <Modal open={true}>{modalEntry}</Modal>}
    </Fragment>
  );
};

export default GetActionName;
