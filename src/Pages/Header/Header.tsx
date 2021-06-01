import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import HeaderTitle from "./Inputs/HeaderTitle";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { setDarkMode, selectDarkMode } from "../../Redux/Slicer/darkModeSlice";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <AppBar
      style={{
        backgroundImage: "linear-gradient(65deg ,#2962ff 30%, #448aff 70%)",
      }}
    >
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <HeaderTitle />
          </Grid>
          <Grid item>
            <IconButton
              edge="start"
              onClick={() => {
                dispatch(setDarkMode());
              }}
            >
              {darkMode ? (
                <Brightness7 fontSize="large" />
              ) : (
                <Brightness4 fontSize="large" style={{ color: "#fff" }} />
              )}
            </IconButton>
          </Grid>
          <Grid item>
            <Typography>
              سامانه مدیریت اطلاعات بیماران رادیوتراپی - بیمارستان سلامت فردا
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
