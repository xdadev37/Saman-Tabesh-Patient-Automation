import { FC, ChangeEvent, useEffect } from "react";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
  Typography,
  Button,
} from "@material-ui/core";
import { BorderColor, ChevronLeft } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  selectRequiredField,
  setComment,
  setDiagnosis,
  setInsurance,
} from "../../../Redux/Slicer/patientInfoSlice";
import { selectDarkMode } from "../../../Redux/Slicer/darkModeSlice";
import { selectDropDownMenu } from "../../../Redux/Slicer/dropMenuDataSlice";

interface IProps {
  setValue: (arg: number) => void;
  setAnotherTabStatus: (arg: boolean) => void;
}

const MedicalInfoUI: FC<IProps> = ({ setValue, setAnotherTabStatus }) => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);
  const tempData = useAppSelector(selectRequiredField);
  const dropDownMenu = useAppSelector(selectDropDownMenu);

  useEffect(() => {
    setAnotherTabStatus(true);
  }, [setAnotherTabStatus]);

  const selectors = [
    {
      id: "diagnosis",
      text: "تشخیص : ",
      value: tempData.Diagnosis,
      func: (arg: string) => setDiagnosis(arg),
      menuData: dropDownMenu.diagnosisMenu,
    },
    {
      id: "insurance",
      text: "بیمه : ",
      value: tempData.Insurance,
      func: (arg: string) => setInsurance(arg),
      menuData: dropDownMenu.insuranceMenu,
    },
  ];

  const submit = () => {
    setAnotherTabStatus(false);
    setValue(2);
  };

  return (
    <form autoComplete="off" onSubmit={submit}>
      <Grid container>
        <Grid container justify="space-around">
          {selectors.map((input) => (
            <InputLabel
              key={input.id}
              htmlFor={input.id}
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              {input.text}
              <Select
                id={input.id}
                required
                style={{ width: 200, height: 40 }}
                variant="outlined"
                value={input.value}
                onChange={(event: ChangeEvent<{ value: unknown }>) => {
                  dispatch(input.func(String(event.target.value)));
                }}
              >
                {input.menuData.map((menu) => (
                  <MenuItem key={input.id} value={menu.id}>
                    <em>{menu.value}</em>
                  </MenuItem>
                ))}
              </Select>
            </InputLabel>
          ))}
        </Grid>

        {/* ------------------------ Comment ------------------------ */}
        <Grid item sm={12} md={12} lg={12}>
          <hr
            style={{
              marginBottom: 20,
              marginTop: 20,
              border: "0.0001px groove #000",
            }}
          />
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

        <Grid container justify="flex-end">
          <Button
            type="submit"
            endIcon={<ChevronLeft />}
            variant="contained"
            color="primary"
            style={{ width: "10%" }}
          >
            بعدی
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default MedicalInfoUI;
