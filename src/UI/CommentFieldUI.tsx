import { FC, Fragment, ChangeEvent } from "react";
import {
  InputLabel,
  TextField,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import { BorderColor } from "@material-ui/icons";
import { useAppSelector } from "../redux/hook";
import { selectDarkMode } from "../redux/Slicer/GlobalReduxUIState/darkModeSlice";

interface IProps {
  defaultValue: string;
  func: (arg: string) => void;
}

const CommentFieldUI: FC<IProps> = ({ defaultValue, func }) => {
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Fragment>
      <InputLabel
        style={{
          color: darkMode ? "#fff" : "#2962ff",
        }}
      >
        <BorderColor />
        &nbsp; توضیحات
      </InputLabel>
      <br />
      <TextField
        defaultValue={defaultValue}
        autoComplete="off"
        label="توضیحات تکمیلی"
        variant="filled"
        multiline
        rows={3}
        fullWidth
        inputProps={{ maxLength: 800 }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          func(event.target.value);
        }}
      />
      <FormHelperText
        style={{ width: "320px", color: darkMode ? "#fff" : "#000" }}
      >
        <br />
        <Typography variant="subtitle2" component="span">
          راهنما :
          <br />
          حداکثر تعداد برای توضیحات کاراکتر مجاز : 800
          <br />
          در آخر برای ثبت نهایی دکمه ثبت را بفشارید
        </Typography>
      </FormHelperText>
    </Fragment>
  );
};

export default CommentFieldUI;
