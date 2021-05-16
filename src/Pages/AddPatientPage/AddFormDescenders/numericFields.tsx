import { FC, Fragment, KeyboardEvent } from "react";
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

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <Fragment>
      {/* NationalId */}
      <InputLabel htmlFor="NationalId">کد ملی</InputLabel>
      <Input
        onKeyPress={numberType}
        inputProps={{ maxLength: 11 }}
        placeholder="کد ملی بیمار"
        id="NationalId"
        {...register("NationalId", {
          required: "پر کردن این فیلد الزامی است!",
          minLength: {
            value: 11,
            message: "مقدار کد ملی حداقل باید 11 عدد باشد!",
          },
        })}
        onSelect={() => {
          dispatch(setNationalId(watch("NationalId")));
        }}
      />
      {errors.NationalId && (
        <Typography>{errors.NationalId.message}</Typography>
      )}

      {/* FileNumber */}
      <InputLabel htmlFor="FileNumber">شماره پرونده</InputLabel>
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
