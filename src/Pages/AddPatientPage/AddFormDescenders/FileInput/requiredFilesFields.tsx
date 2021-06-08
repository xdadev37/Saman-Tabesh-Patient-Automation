import { FC, ChangeEvent } from "react";
import {
  InputLabel,
  Typography,
  FormHelperText,
  TextField,
  Grid,
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
    <Grid container justify="space-between">
      {/* ------------------------ Avatar ------------------------ */}
      <Grid item>
        <ImageValidating setAvatar={setAvatar} />
      </Grid>

      <hr />
      {/* ------------------------ NationalIdDoc ------------------------ */}
      <Grid item>
        <PDFValidating setNationalIdDoc={setNationalIdDoc} />
      </Grid>

      {/* ------------------------ Comment ------------------------ */}
      <Grid item sm={12} md={12} lg={12}>
        <hr style={{ marginTop: 10, marginBottom: 10 }} />
        <InputLabel
          style={{
            color: darkMode ? "#fff" : "#2962ff",
            fontSize: "14px",
          }}
        >
          <BorderColor />
          &nbsp; توضیحات
        </InputLabel>
        <br />
        <TextField
          defaultValue={commentValue.Comment}
          autoComplete="off"
          label="توضیحات تکمیلی"
          variant="filled"
          multiline
          rows={3}
          size="small"
          fullWidth
          inputProps={{ maxLength: 800 }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch(setComment(event.target.value));
          }}
        />
        <FormHelperText
          style={{ width: "320px", color: darkMode ? "#fff" : "#000" }}
        >
          <br />
          <Typography variant="caption" component="span">
            راهنما :
            <br />
            حداکثر تعداد برای توضیحات کاراکتر مجاز : 800
            <br />
            در آخر برای ثبت نهایی دکمه ثبت را بفشارید
          </Typography>
        </FormHelperText>
      </Grid>
    </Grid>
  );
};

export default RequiredFilesFields;
