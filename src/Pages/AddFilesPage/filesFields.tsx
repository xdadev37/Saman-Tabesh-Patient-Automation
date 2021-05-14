import { FC, Fragment, ChangeEvent, useState } from "react";
import { dataArrayOptional } from "../AddPatientPage/dataArray";
import { InputLabel, Input, Typography } from "@material-ui/core";
import axios from "axios";

const FilesFields: FC = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("nameAction");

  const dispatchFile = async (dataName: string, files: {}) => {
    const patch = new Promise((sent, rejected) => {
      axios.post("http://localhost:3001/optionalForm/", {
        data: {
          guid: "",
          [dataName]: files,
          actionName: name,
        },
      });

      rejected(console.log("لا اتصال"));

      // const patch = new Promise((sent, rejected) => {
      //   axios.get("http://localhost:3002/optionalForm/4").then((res) => {
      //     const dataPush = res.data.name;
      //   });
      // });
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
                data.id.message = true;
                setMessage("حجم پی دی اف باید کمتر از 300 کیلوبایت باشد!");
              } else {
                data.id.message = false;
                setMessage("");
                dispatchFile(data.id.value, file);
              }
            }}
          />
          {data.id.message && <Typography>{message}</Typography>}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default FilesFields;
