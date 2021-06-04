import { FC, ChangeEvent } from "react";
import {
  InputLabel,
  Input,
  Button,
  Typography,
  Grid,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useAppSelector } from "../Redux/hook";
import { selectDarkMode } from "../Redux/Slicer/darkModeSlice";
import bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";
import backgroundLogin from "./SalamateFarda.jpg";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "50%",
      borderRadius: "18px",
      display: "flex",
      [theme.breakpoints.down("md")]: {
        width: "90%",
      },
    },
  })
);

interface IProps {
  setUsername: (arg: string) => void;
  setPassword: (arg: string) => void;
  submit: () => void;
}

const LoginUI: FC<IProps> = ({ setUsername, setPassword, submit }) => {
  const classes = useStyle();
  const darkMode = useAppSelector(selectDarkMode);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const hashingPassword = async (arg: string) => {
    await bcrypt.hash(arg, 10).then((res) => setPassword(res));
  };

  return (
    <Grid
      container
      justify="center"
      style={{ height: "100%", position: "fixed" }}
      alignContent="center"
    >
      <Grid
        item
        className={classes.root}
        style={{
          border: `10px groove ${darkMode ? "#fafafa" : "#448aff"}`,
        }}
      >
        <Grid item sm={5} md={5} lg={5} style={{ paddingInline: 50 }}>
          <Typography variant="h3" color={darkMode ? "textPrimary" : "primary"}>
            ورود
          </Typography>
          <Box marginY={5}>
            <FormHelperText style={{ color: darkMode ? "#fff" : "#000" }}>
              برای وررود نام کاربری و رمز عبور صحیح را وارد نمایید
            </FormHelperText>
            <hr />
          </Box>
          <Box marginY={5}>
            <form autoComplete="off" onSubmit={handleSubmit(submit)}>
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
                })}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setValue("username", event.target.value);
                  setUsername(event.target.value);
                }}
              />
              {errors.username && (
                <Typography color="secondary">
                  {errors.username.message}
                </Typography>
              )}
              <FormHelperText>hint: eve.holt@reqres.in</FormHelperText>
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
                    message: "مقدار رمز عبور حداقل باید 8 رقم باشد!",
                  },
                })}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setValue("password", event.target.value);
                  setPassword(event.target.value);
                  // hashingPassword(event.target.value);
                }}
              />
              {errors.password && (
                <Typography color="secondary">
                  {errors.password.message}
                </Typography>
              )}
              <FormHelperText>hint: cityslicka</FormHelperText>
              <Box marginY={5}>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  ورود
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
        <Grid
          item
          sm={7}
          md={7}
          lg={7}
          style={{
            backgroundImage: `url(${backgroundLogin})`,
            backgroundSize: "cover",
            height: "100%",
            borderRadius: "10px",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LoginUI;
