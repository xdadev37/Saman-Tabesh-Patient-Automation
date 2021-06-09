import { FC, ChangeEvent } from "react";
import {
  Grid,
  InputLabel,
  // MenuItem,
  Select,
  TextField,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import { BorderColor } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import {
  selectRequiredField,
  setComment,
  setDiagnosis,
  setInsurance,
} from "../../Redux/Slicer/patientInfoSlice";
import { selectDarkMode } from "../../Redux/Slicer/darkModeSlice";

const MedicalInfoUI: FC = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);
  const tempData = useAppSelector(selectRequiredField);

  return (
    <Grid item>
      <Grid container justify="space-around">
        <InputLabel
          htmlFor="select"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          نام بیماری : &nbsp;
          <Select
            id="select"
            required
            style={{ width: 200, height: 40 }}
            variant="outlined"
            value={tempData.Diagnosis}
            onChange={(event: ChangeEvent<{ value: unknown }>) => {
              dispatch(setDiagnosis(String(event.target.value)));
            }}
          >
            {/* {window.sessionStorage
              .getItem("Diagnosis")![0]
              .split(",")
              .map((args) => (
                <MenuItem value={args}>
                  <em>{args}</em>
                </MenuItem>
              ))} */}
          </Select>
        </InputLabel>

        <InputLabel
          htmlFor="select"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          نوع بیمه : &nbsp;
          <Select
            id="select"
            required
            style={{ width: 200, height: 40 }}
            variant="outlined"
            value={tempData.Insurance}
            onChange={(event: ChangeEvent<{ value: unknown }>) => {
              dispatch(setInsurance(String(event.target.value)));
            }}
          >
            {/* {window.sessionStorage
              .getItem("Insurance")![0]
              .split(",")
              .map((args) => (
                <MenuItem value={args}>
                  <em>{args}</em>
                </MenuItem>
              ))} */}
          </Select>
        </InputLabel>
      </Grid>

      {/* ------------------------ Comment ------------------------ */}
      <Grid item sm={12} md={12} lg={12}>
        <hr style={{ marginTop: 10, marginBottom: 10 }} />
        <InputLabel
          style={{
            color: darkMode ? "#fff" : "#2962ff",
          }}
        >
          <BorderColor />
          &nbsp; توضیحات
        </InputLabel>
        <br />
        <TextField
          defaultValue={tempData.Comment}
          autoComplete="off"
          label="توضیحات تکمیلی"
          variant="filled"
          multiline
          rows={3}
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
          <Typography variant="subtitle2" component="span">
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

export default MedicalInfoUI;
