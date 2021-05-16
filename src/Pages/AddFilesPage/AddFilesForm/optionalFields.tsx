import { FC, ChangeEvent, Fragment } from "react";
import { InputLabel, Input, FormHelperText } from "@material-ui/core";
import FilesFields from "./filesFields";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { setComment } from "../../../Redux/Slicer/patientInfoSlice";
import { selectOptionalField } from "../../../Redux/Slicer/patientInfoSlice";
import axios from "axios";
import { selectFiletId } from "../../../Redux/Slicer/idPasserSlice";

const OptionalFields: FC = () => {
  const dispatch = useAppDispatch();
  const optionalField = useAppSelector(selectOptionalField);
  const fileId = useAppSelector(selectFiletId);

  const submitComment = async () => {
    const comment = new Promise((sent, rejected) => {
      axios
        .patch(`http://localhost:3001/optionalForm/${fileId}`, {
          Comment: optionalField.Comment,
        })
        .then((res) => {
          if ((res.status = 201)) {
            sent(console.log("کامنت رفت", res.statusText));
          } else {
            rejected(console.log("کامنت نرفت"));
          }
        });
    });

    await comment;
  };

  // const modalEntry = (
  //   <Fragment>
  //     <TextField
  //       onSelect={(event: ChangeEvent<HTMLInputElement>) => {
  //         setNewActionName(event.target.value);
  //       }}
  //     >
  //       نام رویداد را وارد کنید
  //     </TextField>
  //     <Button onClick={newActionSubmit}>ثبت</Button>
  //   </Fragment>
  // );

  return (
    <Fragment>
      {/* Files */}
      <FilesFields />
      <form onSubmit={submitComment}>
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
        <Input type="submit" value="ثبت توضیحات" />
        <FormHelperText>حداکثر تعداد کاراکتر مجاز : 800</FormHelperText>
      </form>
    </Fragment>
  );
};

export default OptionalFields;
