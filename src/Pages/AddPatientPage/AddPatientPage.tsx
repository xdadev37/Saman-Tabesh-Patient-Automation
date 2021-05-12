import { FC, ChangeEvent, KeyboardEvent, Fragment } from "react";
import { InputLabel, Input, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { dataArrayRequiredName } from "./dataArray";
import {
  setNationalId,
  setFileNumber,
  setAvatar,
  selectRequiredField,
} from "../../Redux/Slicer/patientInfoSlice";
import axios from "axios";
import NameFields from "./FormFields/RequiredFields/nameFields";

const RequiredFields: FC = () => {
  const dispatch = useAppDispatch();
  const requiredField = useAppSelector(selectRequiredField);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const numberType = (event: KeyboardEvent) => {
    if (event.which < 47 || event.which > 58) {
      event.preventDefault();
    }
  };

  const submit = async () => {
    let axiosPromise = new Promise((sent, rejected) => {
      axios
        .post("http://localhost:3000/api/requiredForm", {
          Name: requiredField.Name,
          FamilyName: requiredField.FamilyName,
          NationalId: requiredField.NationalId,
          FileNumber: requiredField.FileNumber,
          Avatar: requiredField.Avatar,
        })
        .then((res) => {
          console.log(res);
          if ((res.status = 201)) {
            // sent();
          } else {
            sent(console.log("Error"));
          }
        });

      rejected(console.log("ارتباط قطع می باشد!"));
    });

    await axiosPromise;
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
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
          accept: ".jpeg, .jpg",
        }}
        onInput={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files![0].size;

          if (file > 100000) {
            alert(
              <Alert variant="filled" severity="warning">
                حجم عکس آپلود شده بیش تر از حد مجاز است!
              </Alert>
            );
          } else {
            dispatch(setAvatar(watch("Avatar")));
          }
        }}
      />
      <Button type="submit">بعدی</Button>
    </form>
  );
};

export default RequiredFields;
