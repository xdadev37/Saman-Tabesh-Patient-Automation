import { FC, ChangeEvent } from "react";
import { InputLabel, TextField, Typography, Grid } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import {
  selectRequiredField,
  setMobileNo,
  setEmergencyMobileNo,
} from "../../../../Redux/Slicer/patientInfoSlice";
import { selectDarkMode } from "../../../../Redux/Slicer/darkModeSlice";
import { numericValidation } from "./numericValidation";

const TelNumbersFields: FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const dispatch = useAppDispatch();
  const defaultState = useAppSelector(selectRequiredField);
  const darkMode = useAppSelector(selectDarkMode);

  const telNumbers = [
    {
      value: "",
      id: "mobileNo",
      defaultState: defaultState.mobileNo,
      dispatcher: () => dispatch(setMobileNo(watch("mobileNo"))),
      isRequired: true,
    },
    {
      value: " اضطراری",
      id: "emergencyMobileNo",
      defaultState: defaultState.emergencyMobileNo,
      dispatcher: () =>
        dispatch(setEmergencyMobileNo(watch("emergencyMobileNo"))),
      isRequired: false,
    },
  ];

  return (
    <Grid container justify="space-around">
      {telNumbers.map((input) => (
        <Grid item key={input.id}>
          <InputLabel
            htmlFor={input.id}
            style={{
              color: darkMode ? "#fff" : "#2962ff",
              marginTop: 30,
            }}
          >
            {`شماره موبایل${input.value}`} :
          </InputLabel>
          <Grid container>
            <TextField
              defaultValue={input.defaultState.slice(2, 11)}
              id={input.id}
              variant="outlined"
              size="small"
              placeholder="ادامه شماره"
              inputProps={{ maxLength: 9 }}
              {...register(input.id, {
                required: {
                  value: input.isRequired,
                  message: "ثبت حداقل یک شماره ارتباطی الزامی است",
                },
                minLength: {
                  value: 9,
                  message: `مقدار شماره موبایل${input.value} حداقل باید 11 عدد باشد!`,
                },
                pattern: {
                  value: /\d{9}/,
                  message: `شماره موبایل${input.value} فقط شامل اعداد است`,
                },
              })}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                numericValidation(
                  event,
                  input.id,
                  `شماره موبایل${input.value}`,
                  setValue
                );
                input.dispatcher();
              }}
              style={{ width: "80px" }}
            />
            <Typography variant="h5" color="textPrimary">
              <sub>09</sub>
            </Typography>
          </Grid>
          {errors[input.id] && (
            <Typography color="secondary" variant="subtitle2">
              {errors[input.id].message}
            </Typography>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default TelNumbersFields;
