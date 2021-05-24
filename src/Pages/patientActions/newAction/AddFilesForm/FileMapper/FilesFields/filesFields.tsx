import { FC, Fragment, ChangeEvent, useState } from "react";
import {
  InputLabel,
  Input,
  Typography,
  Grid,
  Button,
  Box,
} from "@material-ui/core";
import { CheckCircle, Error, NoteAdd } from "@material-ui/icons";

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
        <Typography color="secondary">
          <Error color="error" />
          حجم پی دی اف باید کمتر از 300 کیلوبایت باشد!
        </Typography>
      );
      break;

    default:
      messageElement = <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Grid item>
        <InputLabel htmlFor={id} style={{ width: "320px", color: "#000" }}>
          {title}
          <Box marginX={10} marginY={2}>
            <Button
              variant="outlined"
              color="primary"
              component="span"
              startIcon={<NoteAdd />}
            >
              {message === false ? (
                <CheckCircle color="primary" />
              ) : (
                "انتخاب فایل ..."
              )}
            </Button>
          </Box>
          <Input
            hidden
            style={{ display: "none" }}
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
        </InputLabel>
      </Grid>
      {messageElement}
    </Fragment>
  );
};

export default FilesFields;
