import { FC, Fragment } from "react";
import { InputLabel, Input } from "@material-ui/core";
import FilesFields from "./filesFields";
import { useAppDispatch } from "../../../../Redux/hook";
import { useForm } from "react-hook-form";
import { setComment } from "../../../../Redux/Slicer/patientInfoSlice";

const OptionalFields: FC = () => {
  const dispatch = useAppDispatch();
  const { watch } = useForm();

  return (
    <Fragment>
      {/* Files */}
      <FilesFields />

      {/* Comment */}
      <InputLabel htmlFor="Comment">توضیحات</InputLabel>
      <Input
        id="Comment"
        type="text"
        inputProps={{ maxLength: 800 }}
        onInput={() => {
          dispatch(setComment(watch("Comment")));
        }}
      />
    </Fragment>
  );
};

export default OptionalFields;
