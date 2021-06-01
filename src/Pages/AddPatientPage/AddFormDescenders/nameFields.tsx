import { FC, Fragment, KeyboardEvent, ChangeEvent } from "react";
import {
  InputLabel,
  Input,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useAppSelector } from "../../../Redux/hook";
import { selectDarkMode } from "../../../Redux/Slicer/darkModeSlice";

interface IProps {
  id: string;
  title: string;
  placeholder: string;
  setState: (arg: string) => void;
  defaultState: string;
}

const NameFields: FC<IProps> = ({
  id,
  title,
  placeholder,
  setState,
  defaultState,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Fragment>
      <InputLabel style={{ color: darkMode ? "#fff" : "#2962ff" }} htmlFor={id}>
        {title}
        <span style={{ color: "#ff0000" }}>*</span> :
      </InputLabel>
      <Input
        defaultValue={defaultState}
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
        placeholder={placeholder}
        type="search"
        id={id}
        {...register<string>(id, {
          required: "پر کردن این فیلد الزامی است!",
        })}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(id, event.target.value);
          setState(id);
        }}
      />
      {errors[id] && (
        <Typography color="secondary">{errors[id].message}</Typography>
      )}
      <FormHelperText>
        <Typography variant="subtitle2" component="span">
          تنها حروف فارسی مجازند.
        </Typography>
      </FormHelperText>
    </Fragment>
  );
};

export default NameFields;
