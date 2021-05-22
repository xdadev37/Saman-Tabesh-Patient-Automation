import { FC, Fragment, ChangeEvent, useState } from "react";
import { InputLabel, Input, Typography, Grid } from "@material-ui/core";
import { CheckCircle, Cancel } from "@material-ui/icons";

interface IProps {
  id: string;
  title: string;
  func: (arg: object) => void;
}

const FilesFields: FC<IProps> = ({ id, title, func }) => {
  const [message, setMessage] = useState(false);
  const [sendStatus, setSendStatus] = useState(false);

  return (
    <Fragment>
      <Grid item>
        <InputLabel htmlFor={id}>{title}</InputLabel>
        <Input
          id={id}
          type="file"
          inputProps={{ accept: ".pdf" }}
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.value !== "") {
              const file = event.target.files![0];
              const fileSize = event.target.files![0].size;

              if (fileSize > 300000) {
                setMessage(true);
              } else {
                setMessage(false);
                setSendStatus(true);
                func(file);
              }
            } else {
              setSendStatus(false);
            }
          }}
        />
      {sendStatus ? <CheckCircle color="primary" /> : <Cancel color="error" />}
      </Grid>
      {message && (
        <Typography>حجم پی دی اف باید کمتر از 300 کیلوبایت باشد!</Typography>
      )}
    </Fragment>
  );
};

export default FilesFields;
