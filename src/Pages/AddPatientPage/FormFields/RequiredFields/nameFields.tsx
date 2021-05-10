import { FC, Fragment, KeyboardEvent } from "react";
import { InputLabel, Input, Typography } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { dataArrayRequiredName } from "../../dataArray";
import { useAppDispatch } from "../../../../Redux/hook";

const NameFields: FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      {dataArrayRequiredName.map((data) => (
        <Fragment key={data.id}>
          <InputLabel htmlFor={data.id}>{data.title}</InputLabel>
          <Input
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
            onMouseEnter={() => console.log(errors)}
            onInput={() => {
              dispatch(data.func(watch(data.id)));
            }}
          />
          {errors[data.id] && (
            <Typography>{errors[data.id].message}</Typography>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default NameFields;
