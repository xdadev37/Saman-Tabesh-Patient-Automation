import { FC, Fragment, KeyboardEvent } from "react";
import {
  InputLabel,
  Input,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { dataArrayRequiredName } from "../../../dataArray";
import { useAppDispatch } from "../../../Redux/hook";
import { BorderColor } from "@material-ui/icons";

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
            {/* <BorderColor fontSize="small" /> */}
            {data.title}
          </InputLabel>
          <Input
            autoComplete="off"
            onKeyPress={(event: KeyboardEvent) => {
              const ew = event.which;

              if (ew === 32) {
                return;
              }
              if (ew < 1574 || ew > 1741) {
                event.preventDefault();
                alert("تنها حروف فارسی مجازند.");
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
            <Typography color="secondary">{errors[data.id].message}</Typography>
          )}
          <FormHelperText>
            <Typography variant="subtitle2" component="span">
              تنها حروف فارسی مجازند.
            </Typography>
          </FormHelperText>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default NameFields;
