import { InputLabel, Input } from "@material-ui/core";
import {
  dataArrayRequiredName,
  dataArrayRequiredCode,
  dataArrayOptional,
} from "./dataArray";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FC, Fragment } from "react";

const schema = yup.object().shape({
  requiredName: yup.string().required(""),
  requiredCode: yup.number().positive().integer().required(""),
  pictureSize: yup
    .mixed()
    .test("fileSize", "حجم عکس بیش از حد مجاز است", (value) => {
      return value && value[0].size <= 100000;
    }),
  pdfSize: yup
    .mixed()
    .test("fileSize", "حجم فایل بیش از حد مجاز است", (value) => {
      return value && value[0].size <= 250000;
    }),
});

const AddPatientPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data: any) => {
    return data;
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      {dataArrayRequiredName.map((data) => (
        <Fragment key={data.id}>
          <InputLabel htmlFor={data.id}>{data.title}</InputLabel>
          <Input
            onKeyPress={(event: React.KeyboardEvent) => {
              if (event.which <= 1575 || event.which >= 1740) {
                event.preventDefault();
              }
            }}
            placeholder={data.placeholder}
            id={data.id}
            {...register}
            type="text"
          />
          {errors.requiredName && errors.requiredName.message}
        </Fragment>
      ))}
      {dataArrayRequiredCode.map((data) => (
        <Fragment key={data.id}>
          <InputLabel htmlFor={data.id}>{data.title}</InputLabel>
          <Input id={data.id} {...register} type="number" />
          {errors.requiredName && <p>{errors.requiredCode.message}</p>}
        </Fragment>
      ))}
      {dataArrayOptional.map((data) => (
        <Fragment key={data.id}>
          <InputLabel htmlFor={data.id}>{data.title}</InputLabel>
          <Input
            id={data.id}
            {...register}
            type="file"
            inputProps={{ accept: ".pdf" }}
          />
          {errors.requiredName && <p>{errors.pdfSize.message}</p>}
        </Fragment>
      ))}
      <InputLabel htmlFor="sss">ssssss</InputLabel>
      <Input id="sss" type="submit" />
    </form>
  );
};

export default AddPatientPage;
