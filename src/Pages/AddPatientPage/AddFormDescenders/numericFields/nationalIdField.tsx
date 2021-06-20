import { FC, Fragment, ChangeEvent, useState } from "react";
import { InputLabel, TextField, Typography } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import {
  selectRequiredField,
  setNationalId,
} from "../../../../redux/Slicer/AddDataSlice/patientInfoSlice";
import { selectDarkMode } from "../../../../redux/Slicer/GlobalReduxUIState/darkModeSlice";
import { numericValidation } from "./numericValidation";

const NumericFields: FC = () => {
  const dispatch = useAppDispatch();
  const defaultState = useAppSelector(selectRequiredField);
  const darkMode = useAppSelector(selectDarkMode);
  const [checkNIdAl, setCheckNIdAl] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  const checkNationalIdAl = (value: string) => {
    if (value !== undefined) {
      if (value.length === 10) {
        if (
          value === "0000000000" ||
          value === "1111111111" ||
          value === "2222222222" ||
          value === "3333333333" ||
          value === "4444444444" ||
          value === "5555555555" ||
          value === "6666666666" ||
          value === "7777777777" ||
          value === "8888888888" ||
          value === "9999999999"
        ) {
          setCheckNIdAl(true);
          return false;
        } else {
          const a = parseInt(value.charAt(9));
          const b =
            parseInt(value.charAt(0)) * 10 +
            parseInt(value.charAt(1)) * 9 +
            parseInt(value.charAt(2)) * 8 +
            parseInt(value.charAt(3)) * 7 +
            parseInt(value.charAt(4)) * 6 +
            parseInt(value.charAt(5)) * 5 +
            parseInt(value.charAt(6)) * 4 +
            parseInt(value.charAt(7)) * 3 +
            parseInt(value.charAt(8)) * 2;
          const c = b % 11;
          if ((c < 2 && a === c) || (c >= 2 && 11 - c === a)) {
            setCheckNIdAl(false);
            return true;
          } else {
            setCheckNIdAl(true);
            return false;
          }
        }
      } else {
        setCheckNIdAl(false);
        return true;
      }
    }
  };

  return (
    <Fragment>
      {/* ------------------------ NationalId ------------------------ */}
      <InputLabel
        htmlFor="NationalId"
        style={{ color: darkMode ? "#fff" : "#2962ff", marginTop: 20 }}
      >
        کد ملی
        <span style={{ color: "#ff0000" }}>*</span> :
      </InputLabel>
      <TextField
        defaultValue={defaultState.NationalId}
        inputProps={{ maxLength: 10 }}
        placeholder="کد ملی بیمار"
        variant="outlined"
        size="small"
        id="NationalId"
        {...register("NationalId", {
          required: "پر کردن این فیلد الزامی است!",
          minLength: {
            value: 10,
            message: "مقدار کد ملی حداقل باید 10 عدد باشد!",
          },
          pattern: {
            value: /\d{10}/,
            message: "کد ملی فقط شامل اعداد است",
          },
          validate: checkNationalIdAl,
        })}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          numericValidation(event, "NationalId", "کد ملی", setValue);
          dispatch(setNationalId(watch("NationalId")));
          checkNationalIdAl(watch("NationalId"));
        }}
      />
      {checkNIdAl && (
        <Typography color="secondary">
          الگوی کد ملی وارد شده نادرست است!
        </Typography>
      )}
      {errors.NationalId && (
        <Typography color="secondary">{errors.NationalId.message}</Typography>
      )}
    </Fragment>
  );
};

export default NumericFields;
