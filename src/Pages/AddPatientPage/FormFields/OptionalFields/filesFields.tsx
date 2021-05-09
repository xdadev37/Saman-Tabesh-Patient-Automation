import { FC, Fragment, ChangeEvent, useState } from "react";
import { dataArrayOptional } from "../../dataArray";
import { InputLabel, Input, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../Redux/hook";

const FilesFields: FC = () => {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const {
    watch,
    formState: { errors },
  } = useForm();

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
              const fileSize = event.target.files![0].size;
              let fileName = event.target.files![0].name;

              if (fileSize > 250001) {
                data.id.message = true;
                setMessage("حجم فایل بیش تر از حد مجاز است!");
              } else {
                data.id.message = false;
                setMessage("");
                // fileName = `${}.pdf`
                dispatch(data.func(watch(data.id.value)));
              }
            }}
          />
          {errors[data.id.value] && (
            <Typography>{errors[data.id.value]}</Typography>
          )}
          {data.id.message && <Typography>{message}</Typography>}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default FilesFields;
