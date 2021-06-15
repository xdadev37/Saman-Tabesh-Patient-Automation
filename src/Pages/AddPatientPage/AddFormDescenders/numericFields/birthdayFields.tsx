import { FC, ChangeEvent } from "react";
import { InputLabel, Grid, TextField, Typography } from "@material-ui/core";
import { DateOfBirth } from "../../../../dataArray";
import { useFormContext } from "react-hook-form";
import { useAppSelector } from "../../../../Redux/hook";
import { selectRequiredField } from "../../../../Redux/Slicer/patientInfoSlice";
import { selectDarkMode } from "../../../../Redux/Slicer/darkModeSlice";
import { numericValidation } from "./numericValidation";

const DateOfBirthFields: FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const darkMode = useAppSelector(selectDarkMode);
  const defaultState = useAppSelector(selectRequiredField);

  return (
    <Grid container justify="space-around">
      {DateOfBirth.map((input) => (
        <Grid item key={input.id}>
          <Grid container alignItems="baseline">
            <InputLabel
              htmlFor={input.id}
              style={{
                color: darkMode ? "#fff" : "#2962ff",
              }}
            >
              {input.value} تولد<span style={{ color: "#ff0000" }}>*</span> :
            </InputLabel>
            <TextField
              defaultValue={defaultState.DateOfBirth.split("/")[input.index]}
              id={input.id}
              variant="outlined"
              size="small"
              placeholder={input.value}
              inputProps={{ maxLength: input.maxLength }}
              {...register(input.id, {
                required: `ورود ${input.value} تولد بیمار الزامی است`,
                pattern: {
                  value: input.pattern,
                  message: `${input.value} تولد فقط شامل اعداد است`,
                },
                min: {
                  value: input.limiter.start,
                  message: `مقدار ${input.value} تولد وارد شده امکان پذیر نیست`,
                },
                max: {
                  value: input.limiter.end,
                  message: `مقدار ${input.value} تولد وارد شده امکان پذیر نیست`,
                },
              })}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                numericValidation(
                  event,
                  input.id,
                  `${input.value} تولد`,
                  setValue
                );
              }}
              style={{ fontSize: "small", width: 70 }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid container direction="column">
        {DateOfBirth.map((input) => (
          <Grid item key={input.id} style={{ marginTop: 10 }}>
            {errors[input.id] && (
              <Typography color="secondary" variant="subtitle2">
                {errors[input.id].message}
              </Typography>
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default DateOfBirthFields;
