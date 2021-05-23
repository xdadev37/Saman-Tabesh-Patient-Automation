import { FC, Fragment, KeyboardEvent, useState } from "react";
import { InputLabel, Input, Typography } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useAppDispatch } from "../../../Redux/hook";
import {
  setNationalId,
  setFileNumber,
} from "../../../Redux/Slicer/patientInfoSlice";

const NumericFields: FC = () => {
  const dispatch = useAppDispatch();
  const numberType = (event: KeyboardEvent) => {
    if (event.which < 47 || event.which > 58) {
      event.preventDefault();
    }
  };

  const [checkNIdAl, setCheckNIdAl] = useState(false);

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const checkNationalIdAl = (value: string) => {
    if (value !== undefined) {
      const c = parseInt(value.charAt(9));
      const n =
        parseInt(value.charAt(0)) * 10 +
        parseInt(value.charAt(1)) * 9 +
        parseInt(value.charAt(2)) * 8 +
        parseInt(value.charAt(3)) * 7 +
        parseInt(value.charAt(4)) * 6 +
        parseInt(value.charAt(5)) * 5 +
        parseInt(value.charAt(6)) * 4 +
        parseInt(value.charAt(7)) * 3 +
        parseInt(value.charAt(8)) * 2;
      const r = n - (n / 11) * 11;
      if (
        (r === 0 && r === c) ||
        (r === 1 && c === 1) ||
        (r > 1 && c !== 11 - r)
      ) {
        setCheckNIdAl(false);
      } else {
        setCheckNIdAl(true);
      }

      if (
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
      } else {
        setCheckNIdAl(false);
      }
    }
  };

  return (
    <Fragment>
      {/* NationalId */}
      <InputLabel htmlFor="NationalId" style={{ color: "#000" }}>
        کد ملی *
      </InputLabel>
      <Input
        onKeyPress={numberType}
        inputProps={{ maxLength: 10 }}
        placeholder="کد ملی بیمار"
        id="NationalId"
        {...register("NationalId", {
          required: "پر کردن این فیلد الزامی است!",
          minLength: {
            value: 10,
            message: "مقدار کد ملی حداقل باید 10 عدد باشد!",
          },
        })}
        onSelect={() => {
          dispatch(setNationalId(watch("NationalId")));
          checkNationalIdAl(watch("NationalId"));
        }}
      />
      {checkNIdAl && <Typography>الگوی کد ملی وارد شده نادرست است!</Typography>}
      {errors.NationalId && (
        <Typography>{errors.NationalId.message}</Typography>
      )}

      {/* FileNumber */}
      <InputLabel htmlFor="FileNumber" style={{ color: "#000" }}>
        شماره پرونده *
      </InputLabel>
      <Input
        onKeyPress={numberType}
        id="FileNumber"
        inputProps={{ maxLength: 20 }}
        placeholder="شماره پرونده بیمار"
        {...register("FileNumber", {
          required: "پر کردن این فیلد الزامی است!",
        })}
        onSelect={() => {
          dispatch(setFileNumber(watch("FileNumber")));
        }}
      />
      {errors.FileNumber && (
        <Typography>{errors.FileNumber.message}</Typography>
      )}
    </Fragment>
  );
};

export default NumericFields;
