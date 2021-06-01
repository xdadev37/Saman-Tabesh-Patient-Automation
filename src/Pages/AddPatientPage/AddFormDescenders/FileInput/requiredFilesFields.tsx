import { FC, Fragment, ChangeEvent } from "react";
import {
  InputLabel,
  Typography,
  FormHelperText,
  TextField,
} from "@material-ui/core";
import { BorderColor } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import {
  setComment,
  selectRequiredField,
} from "../../../../Redux/Slicer/patientInfoSlice";
import { selectDarkMode } from "../../../../Redux/Slicer/darkModeSlice";
import ImageValidating from "./filesValidating/imageValidating";
import PDFValidating from "./filesValidating/pdfValidating";

interface IFiles {
  setAvatar: (arg: Blob) => void;
  setNationalIdDoc: (arg: Blob) => void;
}

const RequiredFilesFields: FC<IFiles> = ({ setAvatar, setNationalIdDoc }) => {
  const dispatch = useAppDispatch();
  const commentValue = useAppSelector(selectRequiredField);
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Fragment>
      {/* ------------------------ Avatar ------------------------ */}
      <ImageValidating setAvatar={setAvatar} />

      <hr />
      {/* ------------------------ NationalIdDoc ------------------------ */}
      <PDFValidating setNationalIdDoc={setNationalIdDoc} />

      {/* ------------------------ Comment ------------------------ */}
      <hr />
      <InputLabel
        style={{
          width: "320px",
          color: darkMode ? "#fff" : "#2962ff",
          marginBottom: "10px",
        }}
      >
        <BorderColor />
        &nbsp; توضیحات
      </InputLabel>
      <TextField
        defaultValue={commentValue.Comment}
        autoComplete="off"
        label="توضیحات تکمیلی"
        variant="filled"
        multiline
        rows={4}
        fullWidth
        inputProps={{ maxLength: 800 }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch(setComment(event.target.value));
        }}
      />
      <FormHelperText>
        <Typography
          variant="subtitle2"
          component="span"
          style={{ width: "320px", color: darkMode ? "#fff" : "#000" }}
        >
          راهنما :
          <br />
          حداکثر تعداد برای توضیحات کاراکتر مجاز : 800
          <br />
          در آخر برای ثبت نهایی دکمه ثبت را بفشارید
        </Typography>
      </FormHelperText>
    </Fragment>
  );
};

export default RequiredFilesFields;
