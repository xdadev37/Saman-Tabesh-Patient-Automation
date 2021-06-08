import { FC, Fragment, ChangeEvent } from "react";
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
  FormHelperText,
  TextField,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Close, BorderColor, Check } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { selectDarkMode } from "../../../../Redux/Slicer/darkModeSlice";
import { selectRequiredField } from "../../../../Redux/Slicer/patientInfoSlice";
import { setActionForm } from "../../../../Redux/Slicer/actionStatusSlice";

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

interface IProps {
  newActionName: string;
  setNewActionName: (arg: string) => void;
  userComment: string;
  setUserComment: (arg: string) => void;
  submit: () => void;
}

const ModalEntry: FC<IProps> = ({
  newActionName,
  setNewActionName,
  userComment,
  setUserComment,
  submit,
}) => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);
  const tempData = useAppSelector(selectRequiredField);
  const classes = useStyle();

  return (
    <Fragment>
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

        {/* Comment */}
        <InputLabel
          style={{ width: "320px", color: darkMode ? "#fff" : "#2962ff" }}
        >
          <BorderColor />
          <span className={classes.span}>توضیحات</span>
        </InputLabel>
        <TextField
          className={classes.marginY}
          autoComplete="off"
          label="توضیحات تکمیلی"
          variant="filled"
          multiline
          rows={7}
          fullWidth
          defaultValue={userComment}
          inputProps={{ maxLength: 800 }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUserComment(event.target.value);
          }}
        />
        <FormHelperText>
          <Typography
            variant="subtitle2"
            component="span"
            style={{ width: "320px", color: darkMode ? "#fff" : "#000" }}
          >
            راهنما :
            <br />
            حداکثر تعداد کاراکتر مجاز : 800
            <br />
            در آخر برای ثبت نهایی دکمه ثبت را بفشارید
          </Typography>
        </FormHelperText>

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
    </Fragment>
  );
};

export default ModalEntry;
