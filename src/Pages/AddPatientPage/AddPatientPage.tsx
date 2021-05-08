import { FC, Fragment, ChangeEvent, KeyboardEvent, useState } from "react";
import { InputLabel, Input, Button, Typography } from "@material-ui/core";
import { dataArrayRequiredName, dataArrayOptional } from "./dataArray";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import {
  setRequiredFields,
  setOptionalFields,
  selectRequiredField,
  selectOptionalField,
} from "../../Redux/Slicer/patientInfoSlice";
import axios from "axios";

const AddPatientPage: FC = () => {
  const requiredField = useAppSelector(selectRequiredField);
  const optionalField = useAppSelector(selectOptionalField);
  const dispatch = useAppDispatch();
  const [fileStatus, setFileStatus] = useState(false);
  const [name, setName] = useState();
  // console.log(requiredField);

  const numberType = (event: KeyboardEvent) => {
    if (event.which < 47 || event.which > 58) {
      event.preventDefault();
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const submit = () => {
    if (fileStatus === false) {
      axios
        .post("http://localhost:3000/addPatient", {
          // Name: Name,
          // FamilyName: FamilyName,
          // NationalId: NationalId,
          // FileNumber: FileNumber,
          // Avatar: Avatar,
          // NationalIdDoc: NationalIdDoc,
          // PathologyDoc: PathologyDoc,
          // TreatmentDoc: TreatmentDoc,
          // CommitmentDoc: CommitmentDoc,
          // MRIReportDoc: MRIReportDoc,
          // CTReportDoc: CTReportDoc,
          // PETReportDoc: PETReportDoc,
          // SonoReportDoc: SonoReportDoc,
          // MamoReportDoc: MamoReportDoc,
          // LabReportDoc: LabReportDoc,
          // Comment: Comment,
        })
        .then((res) => {});
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
            onInput={() => {
              console.log(requiredField[0][data.id]);
              // dispatch(setRequiredFields(requiredField[0][data.id] = watch(data.id)));
            }}
            onKeyPress={(event: KeyboardEvent) => {
              const ew = event.which;

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
            {...register<string>(data.id, {
              required: "پر کردن این فیلد الزامی است!",
            })}
            type="text"
          />
          {errors[data.id] && (
            <Typography>{errors[data.id].message}</Typography>
          )}
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
            onInput={(event: ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files![0].size;
              if (file > 250001) {
                setFileStatus(true);
              }
            }}
          />
          {errors[data.id] && <p>{errors[data.id].message}</p>}
          {fileStatus && <p>حجم فایل زیاد است!</p>}
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
