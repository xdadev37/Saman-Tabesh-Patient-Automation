import { FC, Fragment, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import { Input, InputLabel, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { selectDarkMode } from "../Redux/Slicer/darkModeSlice";
import { setUsername, setPassword } from "../Redux/Slicer/userPassSlice";

const UserPassUI: FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const darkMode = useAppSelector(selectDarkMode);
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <InputLabel
        htmlFor="username"
        style={{
          color: darkMode ? "#fff" : "#000",
          marginBottom: 10,
        }}
      >
        نام کاربری :
      </InputLabel>
      <Input
        fullWidth
        id="username"
        type="search"
        placeholder="نام کاربری خود را وارد کنید"
        {...register("username", {
          required: "پر کردن این فیلد الزامی است!",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "فرمت ایمیل نادرست است",
          },
        })}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue("username", event.target.value);
          dispatch(setUsername(event.target.value));
        }}
      />
      {errors.username && (
        <Typography color="secondary">{errors.username.message}</Typography>
      )}
      <InputLabel
        htmlFor="password"
        style={{
          marginTop: 30,
          marginBottom: 10,
          color: darkMode ? "#fff" : "#000",
        }}
      >
        گذرواژه :
      </InputLabel>
      <Input
        fullWidth
        id="password"
        type="password"
        placeholder="گذرواژه خود را وارد کنید"
        {...register("password", {
          required: "پر کردن این فیلد الزامی است!",
          minLength: {
            value: 8,
            message: "مقدار گذرواژه حداقل باید 8 رقم باشد!",
          },
          // pattern: {
          //   value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
          //   message: "گذرواژه وارد شده اشتباه است",
          // },
        })}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue("password", event.target.value);
          dispatch(setPassword(event.target.value));
        }}
      />
      {errors.password && (
        <Typography color="secondary">{errors.password.message}</Typography>
      )}
    </Fragment>
  );
};

export default UserPassUI;
