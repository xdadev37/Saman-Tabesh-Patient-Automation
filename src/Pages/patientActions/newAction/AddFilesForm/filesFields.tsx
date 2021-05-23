import { FC, Fragment, ChangeEvent, useState } from "react";
import { InputLabel, Input, Typography, Grid } from "@material-ui/core";
import { CheckCircle, Cancel } from "@material-ui/icons";

interface IProps {
  id: string;
  title: string;
  func: (arg: object) => void;
}

const FilesFields: FC<IProps> = ({ id, title, func }) => {
  const [message, setMessage] = useState<boolean | null>(null);

  let messageElement;
  switch (message) {
    case true:
      messageElement = (
        <Fragment>
          <Typography color="secondary">
            حجم پی دی اف باید کمتر از 300 کیلوبایت باشد!
          </Typography>
          <Cancel color="error" />
        </Fragment>
      );
      break;

    case false:
      messageElement = <CheckCircle color="primary" />;
      break;

    default:
      messageElement = <Fragment></Fragment>;
  }

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
                func(file);
              }
            } else {
              setMessage(null);
            }
          }}
        />
      </Grid>
      {messageElement}
    </Fragment>
  );
};

export default FilesFields;
