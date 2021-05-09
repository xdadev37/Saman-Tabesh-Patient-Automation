import { FC, Fragment, ChangeEvent, KeyboardEvent } from "react";
import { InputLabel, Input, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../../Redux/hook";
import NameFields from "./nameFields";
import {
  setNationalId,
  setFileNumber,
  setAvatar,
} from "../../../../Redux/Slicer/patientInfoSlice";

const RequiredFields: FC = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const numberType = (event: KeyboardEvent) => {
    if (event.which < 47 || event.which > 58) {
      event.preventDefault();
    }
  };

  return (
    <Fragment>
      {/* Names */}
      <NameFields />

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
        onInput={() => {
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
        onInput={() => {
          dispatch(setFileNumber(watch("FileNumber")));
        }}
      />
      {errors.FileNumber && (
        <Typography>{errors.FileNumber.message}</Typography>
      )}

      {/* Avatar */}
      <InputLabel htmlFor="Avatar">عکس پرسنلی بیمار</InputLabel>
      <Input
        id="Avatar"
        type="file"
        inputProps={{
          accept: ".jpeg",
        }}
        onInput={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files![0].size;

          if (file > 110000) {
            alert("حجم عکس آپلود شده بیش تر از حد مجاز است!");
          } else {
            dispatch(setAvatar(watch("Avatar")));
          }
        }}
      />
    </Fragment>
  );
};

export default RequiredFields;
