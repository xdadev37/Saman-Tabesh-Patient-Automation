import {
  InputLabel,
  Input,
  Button,
  Typography,
  Grid,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import backgroundLogin from "./SalamateFarda.jpg";

const Login: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //   const time = () => {
  //     document.querySelectorAll(
  //       "#time"
  //     )![0].innerHTML = new Date().toLocaleTimeString("fa-IR");
  //   };
  //   setInterval(time, 1000);

  const submit = async () => {
    await null;
  };

  return (
    <Grid
      container
      justify="center"
      style={{
        width: "80%",
        border: "5px solid #303030",
        borderRadius: "18px",
        height: "80%",
        marginTop: 200,
        marginBottom: 100,
        marginInline: 150,
      }}
    >
      <Grid item sm={6} md={6} lg={6} style={{ paddingInline: 50 }}>
        <Box marginY={5}>
          <Typography variant="h5" color="primary">
            ورود
          </Typography>
          <FormHelperText style={{ color: "#000" }}>
            برای وررود نام کاربری و رمز عبور صحیح را وارد نمایید
          </FormHelperText>
          <hr />
        </Box>
        <Box marginY={5}>
          <form autoComplete="off" onSubmit={handleSubmit(submit)}>
            <InputLabel htmlFor="username" style={{ color: "#000" }}>
              نام کاربری
            </InputLabel>
            <Input
              fullWidth
              id="username"
              type="search"
              {...register("username", {
                required: "پر کردن این فیلد الزامی است!",
              })}
            />
            {errors.username && (
              <Typography color="secondary">
                {errors.username.message}
              </Typography>
            )}
            <InputLabel
              htmlFor="password"
              style={{ marginTop: 30, color: "#000" }}
            >
              پسورد
            </InputLabel>
            <Input
              fullWidth
              id="password"
              type="password"
              {...register("password", {
                required: "پر کردن این فیلد الزامی است!",
                minLength: {
                  value: 8,
                  message: "مقدار رمز عبور حداقل باید 8 رقم باشد!",
                },
              })}
            />
            {errors.password && (
              <Typography color="secondary">
                {errors.password.message}
              </Typography>
            )}
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
      <Grid item sm={6} md={6} lg={6}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{
            backgroundImage: `url(${backgroundLogin})`,
            backgroundSize: "cover",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          {/* <Box
            border="3px solid #303030"
            borderRadius="18px"
            width={250}
            paddingY={5}
            paddingX={6}
            style={{ backgroundColor: "#fafafa" }}
          >
            <Typography
              id="time"
              variant="h3"
              style={{
                color: "#000",
                fontWeight: "bolder",
              }}
            >
              00:00:00
            </Typography>
          </Box> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
