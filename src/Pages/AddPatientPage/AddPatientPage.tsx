import { InputLabel, Input, Button } from "@material-ui/core";
import { dataArrayRequiredName, dataArrayOptional } from "./dataArray";
import { useForm } from "react-hook-form";
import { FC, Fragment, ChangeEvent, KeyboardEvent, useState } from "react";

interface IFormInputs {
  requiredName: string;
  NationalId: number;
  FileNumber: number;
  Avatar: string;
  pdfFiles: string;
  Comment: string;
}

const AddPatientPage: FC = () => {
  const [fileStatus, setFileStatus] = useState(true);

  const numberType = (event: KeyboardEvent) => {
    if (event.which < 47 || event.which > 58) {
      event.preventDefault();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const submit = (data: any) => {
    if (fileStatus === true) {
      return JSON.stringify(data);
    } else {
      alert("حجم فایل ها بیش تر از حد مجاز است!");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {/* Names */}
      {dataArrayRequiredName.map((data) => (
        <Fragment key={data.id}>
          <InputLabel htmlFor={data.id}>{data.title}</InputLabel>
          <Input
            onKeyPress={(event: KeyboardEvent) => {
              const ew = event.which;
              console.log(ew);
              if (ew === 32) {
                return;
              }
              if (ew < 1574 || ew > 1741) {
                event.preventDefault();
              }
            }}
            inputProps={{ maxLength: 80 }}
            placeholder={data.placeholder}
            id={data.id}
            {...register("requiredName", {
              required: "پر کردن این فیلد الزامی است!",
            })}
            type="text"
          />
          {errors.requiredName && <p>{errors.requiredName.message}</p>}
        </Fragment>
      ))}

      {/* NationalId */}
      <InputLabel htmlFor="NationalId">کد ملی</InputLabel>
      <Input
        onKeyPress={numberType}
        inputProps={{ maxLength: 11 }}
        id="NationalId"
        {...register("NationalId", {
          required: "پر کردن این فیلد الزامی است!",
          minLength: {
            value: 11,
            message: "مقدار کد ملی حداقل باید 11 عدد باشد!",
          },
        })}
      />
      {errors.NationalId && <p>{errors.NationalId.message}</p>}

      {/* FileNumber */}
      <InputLabel htmlFor="FileNumber">شماره پرونده</InputLabel>
      <Input
        onKeyPress={numberType}
        id="FileNumber"
        inputProps={{ maxLength: 20 }}
        {...register("FileNumber", {
          required: "پر کردن این فیلد الزامی است!",
        })}
      />
      {errors.FileNumber && <p>{errors.FileNumber.message}</p>}

      {/* Avatar */}
      <InputLabel htmlFor="Avatar">عکس پرسنلی بیمار</InputLabel>
      <Input
        id="Avatar"
        type="file"
        inputProps={{
          accept: ".jpeg",
        }}
      />
      {errors.Avatar && <p>ss</p>}

      {/* Files */}
      {dataArrayOptional.map((data) => (
        <Fragment key={data.id}>
          <InputLabel htmlFor={data.id}>{data.title}</InputLabel>
          <Input
            id={data.id}
            type="file"
            inputProps={{ accept: ".pdf" }}
            // {...register("pdfSize", {})}
            onInput={(event: ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files![0].size;
              if (file > 250001) {
                alert("حجم فایل بیش تر از حد مجاز است!");
                setFileStatus(false);
              }
            }}
          />
          {errors.pdfFiles && <p>{errors.pdfFiles.message}</p>}
        </Fragment>
      ))}

      {/* Comment */}
      <InputLabel htmlFor="Comment">توضیحات</InputLabel>
      <Input id="Comment" type="text" inputProps={{ maxLength: 800 }} />

      <Button variant="contained" type="submit">
        ثبت
      </Button>
    </form>
  );
};

export default AddPatientPage;
