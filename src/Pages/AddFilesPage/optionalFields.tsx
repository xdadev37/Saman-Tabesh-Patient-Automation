import { FC, ChangeEvent } from "react";
import { InputLabel, Input } from "@material-ui/core";
import FilesFields from "./filesFields";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { setComment } from "../../Redux/Slicer/patientInfoSlice";
import { selectOptionalField } from "../../Redux/Slicer/patientInfoSlice";
import axios from "axios";

const OptionalFields: FC = () => {
  const dispatch = useAppDispatch();
  const optionalField = useAppSelector(selectOptionalField);

  const submit = async () => {
    let axiosPromise = new Promise((sent, rejected) => {
      axios
        .post("http://localhost:3000/api/optionalForm", {
          Comment: optionalField.Comment,
        })
        .then((res) => {
          console.log(res);
          if ((res.status = 201)) {
            sent(console.log(res.statusText));
          } else {
            sent(console.log("Error"));
          }
        });

      rejected(console.log("ارتباط قطع می باشد!"));
    });

    await axiosPromise;
  };

  return (
    <form onSubmit={submit}>
      {/* Files */}
      <FilesFields />

      {/* Comment */}
      <InputLabel htmlFor="Comment">توضیحات</InputLabel>
      <Input
        id="Comment"
        type="text"
        rows={5}
        inputProps={{ maxLength: 800 }}
        onInput={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch(setComment(event.target.value));
        }}
      />
      <Input type="submit" value="ارسال" />
    </form>
  );
};

export default OptionalFields;
