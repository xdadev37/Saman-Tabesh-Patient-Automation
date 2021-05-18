import { FC, Fragment, ChangeEvent, useState } from "react";
import { InputLabel, Input, Typography, Grid } from "@material-ui/core";
import { CheckCircle, Cancel } from "@material-ui/icons";
import axios from "axios";
import { useAppSelector } from "../../../Redux/hook";
import { selectFiletId } from "../../../Redux/Slicer/idPasserSlice";

interface IProps {
  id: string;
  title: string;
}

const FilesFields: FC<IProps> = ({ id, title }) => {
  const fileId = useAppSelector(selectFiletId);
  const [message, setMessage] = useState(false);
  const [sendStatus, setSendStatus] = useState(false);
  console.log(fileId);

  const dispatchFile = async (dataName: string, files: {}) => {
    const patch = new Promise((sent, rejected) => {
      axios
        .patch(`http://localhost:3001/optionalForm/${fileId}`, {
          [dataName]: files,
        })
        .then((res) => {
          if ((res.status = 200)) {
            console.log("File added", res.statusText);
            sent(setSendStatus(true));
          } else {
            console.log("Error", res.statusText);
            rejected(setSendStatus(false));
          }
        })
        .catch((error) => {
          console.log(error);
          rejected(setSendStatus(false));
        });
    });

    await patch;
  };

  return (
    <Fragment>
      <Grid item direction="row">
        <InputLabel htmlFor={id}>{title}</InputLabel>
        <Input
          id={id}
          type="file"
          inputProps={{ accept: ".pdf" }}
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files![0];
            const fileSize = event.target.files![0].size;

            if (fileSize > 300000) {
              setMessage(true);
            } else {
              setMessage(false);
              dispatchFile(id, file);
            }
          }}
        />
        {sendStatus ? (
          <CheckCircle color="primary" />
        ) : (
          <Cancel color="error" />
        )}
      </Grid>
      {message && (
        <Typography>حجم پی دی اف باید کمتر از 300 کیلوبایت باشد!</Typography>
      )}
    </Fragment>
  );
};

export default FilesFields;
