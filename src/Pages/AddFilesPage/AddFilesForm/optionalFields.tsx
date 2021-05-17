import { FC, ChangeEvent, Fragment, useState } from "react";
import { InputLabel, Input, FormHelperText } from "@material-ui/core";
import FilesFields from "./filesFields";
import { useAppSelector } from "../../../Redux/hook";
import axios from "axios";
import { selectFiletId } from "../../../Redux/Slicer/idPasserSlice";

const OptionalFields: FC = () => {
  const fileId = useAppSelector(selectFiletId);
  const [userComment, setUserComment] = useState("");

  const submitComment = async () => {
    const comment = new Promise((sent, rejected) => {
      axios
        .patch(`http://localhost:3001/optionalForm/${fileId}`, {
          Comment: userComment,
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
            setUserComment(event.target.value);
          }}
        />
        <Input type="submit" value="ثبت توضیحات" />
        <FormHelperText>حداکثر تعداد کاراکتر مجاز : 800</FormHelperText>
      </form>
    </Fragment>
  );
};

export default OptionalFields;
