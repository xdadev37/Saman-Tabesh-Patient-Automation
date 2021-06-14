import { FC, ChangeEvent } from "react";
import { InputLabel, TextField, Typography, Grid } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import {
  selectRequiredField,
  setPhoneNumber,
  setUrgencyNumber,
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
      id: "phoneNumber",
      defaultState: defaultState.phoneNumber,
      dispatcher: () => dispatch(setPhoneNumber(watch("phoneNumber"))),
      isRequired: true,
    },
    {
      value: " اضطراری",
      id: "urgencyNumber",
      defaultState: defaultState.urgencyNumber,
      dispatcher: () => dispatch(setUrgencyNumber(watch("urgencyNumber"))),
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
              marginBottom: 10,
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
                  // value: /^[\u06F0][\u06F0-\u06F9]{3}[\u06F0-\u06F9]{3}[\u06F0-\u06F9]{4}/,
                  value: /(0|\+98)?([ ]|,|-|[()]){0,2}9[1|2|3|4]([ ]|,|-|[()]){0,2}(?:[0-9]([ ]|,|-|[()]){0,2}){8}/,
                  message: `شماره موبایل${input.value} اشتباه وارد شده`,
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
              style={{ width: "50%" }}
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
