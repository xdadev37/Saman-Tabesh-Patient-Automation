import {
  Button,
  Typography,
  Grid,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useAppSelector } from "../Redux/hook";
import { selectDarkMode } from "../Redux/Slicer/darkModeSlice";
import { useForm, FormProvider } from "react-hook-form";
import backgroundLogin from "./SalamateFarda.jpg";
import UserPassUI from "./UserPassUI";

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
  submit: () => void;
}

const LoginUI: React.FC<IProps> = ({ submit }) => {
  const classes = useStyle();
  const darkMode = useAppSelector(selectDarkMode);

  const methods = useForm();
  const { handleSubmit } = methods;

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
              برای وررود نام کاربری و گذرواژه صحیح را وارد نمایید
            </FormHelperText>
            <hr />
          </Box>
          <Box marginY={5}>
            <FormProvider {...methods}>
              <form autoComplete="off" onSubmit={handleSubmit(submit)}>
                <UserPassUI />
                <br />
                <FormHelperText>User: eve.holt@reqres.in</FormHelperText>
                <FormHelperText>Pass: cityslicka</FormHelperText>
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
            </FormProvider>
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
