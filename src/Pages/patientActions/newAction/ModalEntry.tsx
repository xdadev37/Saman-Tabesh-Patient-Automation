import { FC, ChangeEvent, useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Typography,
  Button,
  List,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Close, Check } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectRequiredField } from "../../../Redux/Slicer/patientInfoSlice";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import CommentField from "../../../UI/CommentFieldUI";
import OptionalFields from "./AddFilesForm/optionalFields";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      marginTop: theme.spacing(10),
      marginInline: theme.spacing(10),
    },

    button: {
      margin: theme.spacing(5),
      float: "right",
      width: "30%",
    },

    marginY: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },

    span: { marginInline: "10px", fontWeight: "normal" },
  })
);

const ModalEntry: FC = () => {
  const dispatch = useAppDispatch();
  const tempData = useAppSelector(selectRequiredField);
  const classes = useStyle();
  const [newActionName, setNewActionName] = useState("");
  const [userComment, setUserComment] = useState("");
  const [completedStatus, setCompletedStatus] = useState(false);

  const submit = () => {
    setCompletedStatus(true);
  };

  const modalEntry = (
    <Grid container>
      <AppBar>
        <Toolbar>
          <Grid container justify="space-between">
            <IconButton onClick={() => dispatch(setActionForm("mainPage"))}>
              <Close />
            </IconButton>
            <Typography variant="h6">{`ایجاد اقدام جدید برای ${tempData.Name} ${tempData.FamilyName}`}</Typography>
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
      <List className={classes.modal}>
        <InputLabel htmlFor="select" className={classes.marginY}>
          نام رویداد : &nbsp;
          <Select
            id="select"
            required
            style={{ width: 200 }}
            variant="outlined"
            value={newActionName}
            onChange={(event: ChangeEvent<{ value: unknown }>) => {
              setNewActionName(String(event.target.value));
            }}
          >
            <MenuItem value="ثبت اولیه پرونده">
              <em>ثبت اولیه پرونده</em>
            </MenuItem>
            <MenuItem value="فاز دوم درمان">
              <em>فاز دوم درمان</em>
            </MenuItem>
            <MenuItem value="پیگیری نتیجه درمان">
              <em>پیگیری نتیجه درمان</em>
            </MenuItem>
          </Select>
        </InputLabel>

        {/* ------------------------ Comment ------------------------ */}
        <CommentField defaultValue={userComment} func={setUserComment} />

        <Button
          variant="contained"
          color="primary"
          onClick={submit}
          startIcon={<Check />}
          className={classes.button}
        >
          ثبت رویداد
        </Button>
      </List>
    </Grid>
  );

  return (
    <Grid container>
      {completedStatus ? (
        <OptionalFields
          newActionName={newActionName}
          userComment={userComment}
          setCompletedStatus={setCompletedStatus}
        />
      ) : (
        modalEntry
      )}
    </Grid>
  );
};

export default ModalEntry;
