import { InputLabel, Input } from "@material-ui/core";
import FilesFields from "./filesFields";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import { useForm } from "react-hook-form";
import { setComment } from "../../../../Redux/Slicer/patientInfoSlice";
import { selectOptionalField } from "../../../../Redux/Slicer/patientInfoSlice";
import axios from "axios";

const OptionalFields: React.FC = () => {
  const dispatch = useAppDispatch();
  const { watch } = useForm();
  const optionalField = useAppSelector(selectOptionalField);

  const submit = async () => {
    let axiosPromise = new Promise((sent, rejected) => {
      axios
        .post("http://localhost:3000/api/optionalForm", {
        })
        .then((res) => {
          console.log(res);
          if ((res.status = 201)) {
            sent(handleNext());
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
        onInput={() => {
          dispatch(setComment(watch("Comment")));
        }}
      />
      <Input type="submit" value="ارسال" />
    </form>
  );
};

export default OptionalFields;
