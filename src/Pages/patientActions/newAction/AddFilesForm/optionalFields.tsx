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

  const submitComment = async () => {
    const comment = new Promise((sent, rejected) => {
      axios
        .patch(`http://localhost:3001/optionalForm/${fileId}`, {
          Comment: userComment,
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
      {dataArrayOptional.map((data) => (
        <FilesFields key={data.id} id={data.id} title={data.title} />
      ))}

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
        <Button variant="contained" color="primary" onClick={submitComment}>
          ثبت توضیحات
        </Button>
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
        onClick={() => window.location.reload()}
        color="secondary"
      >
        تمام
      </Button>
    </Grid>
  );
};

export default OptionalFields;
