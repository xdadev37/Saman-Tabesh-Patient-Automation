import { FC, Fragment, ChangeEvent } from "react";
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
      <InputLabel
        style={{ color: darkMode ? "#fff" : "#2962ff", fontSize: "14px" }}
        htmlFor={id}
      >
        {title}
        <span style={{ color: "#ff0000" }}>*</span> :
      </InputLabel>
      <Input
        style={{ fontSize: "small" }}
        defaultValue={defaultState}
        inputProps={{ maxLength: 80 }}
        placeholder={placeholder}
        type="search"
        id={id}
        {...register<string>(id, {
          required: "پر کردن این فیلد الزامی است!",
        })}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const inputValue = event.target.value;

          if (inputValue === " ") {
            event.target.value = "";
          } else {
            if (inputValue !== "") {
              if (!inputValue.charAt(inputValue.length - 1).match(/[ا-ی آ]/)) {
                event.target.value = inputValue.slice(0, inputValue.length - 1);
                alert("تنها حروف فارسی مجازند");
              } else {
                setValue(id, inputValue);
              }
            } else {
              setValue(id, "");
            }
          }

          setState(id);
        }}
      />
      {errors[id] && (
        <Typography color="secondary">{errors[id].message}</Typography>
      )}
      <FormHelperText>
        <Typography variant="caption" component="span">
          تنها حروف فارسی مجازند.
        </Typography>
      </FormHelperText>
    </Fragment>
  );
};

export default NameFields;
