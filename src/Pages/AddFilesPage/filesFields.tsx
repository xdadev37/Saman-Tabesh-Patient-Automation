import { FC, Fragment, ChangeEvent } from "react";
import { dataArrayOptional } from "../AddPatientPage/dataArray";
import { InputLabel, Input, Typography } from "@material-ui/core";
import axios from "axios";
import { useAppSelector } from "../../Redux/hook";
import { selectFiletId } from "../../Redux/Slicer/idPasserSlice";

const FilesFields: FC = () => {
  const fileId = useAppSelector(selectFiletId);

  const dispatchFile = async (dataName: string, files: {}) => {
    const patch = new Promise((sent, rejected) => {
      axios
        .patch(`http://localhost:3001/optionalForm/${fileId}`, {
          [dataName]: files,
        })
        .then((res) => {
          if ((res.status = 200)) {
            sent(console.log("File added", res.statusText));
          }
          if ((res.status = 511)) {
            rejected(
              console.log("Client not connected to internet", res.statusText)
            );
          } else {
            rejected(console.log("Error", res.statusText));
          }
        })
        .catch((error) => {
          rejected(console.log(error));
        });
    });

    await patch;
  };

  return (
    <Fragment>
      {dataArrayOptional.map((data) => (
        <Fragment key={data.id.value}>
          <InputLabel htmlFor={data.id.value}>{data.title}</InputLabel>
          <Input
            id={data.id.value}
            type="file"
            inputProps={{ accept: ".pdf" }}
            onInput={(event: ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files![0];
              const fileSize = event.target.files![0].size;

              if (fileSize > 300000) {
              } else {
                data.id.message = false;
                dispatchFile(data.id.value, file);
              }
            }}
          />
          {data.id.message && (
            <Typography>
              حجم پی دی اف باید کمتر از 300 کیلوبایت باشد!
            </Typography>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default FilesFields;
