import { FC, Fragment, KeyboardEvent } from "react";
import { InputLabel, Input, Typography } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { dataArrayRequiredName } from "../dataArray";
import { useAppDispatch } from "../../../Redux/hook";

const NameFields: FC = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      {dataArrayRequiredName.map((data) => (
        <Fragment key={data.id}>
          <InputLabel style={{ color: "#000" }} htmlFor={data.id}>
            {data.title}
          </InputLabel>
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
            onSelect={() => {
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
