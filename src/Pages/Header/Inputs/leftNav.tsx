import { Brightness4, Brightness7 } from "@material-ui/icons";
import { Typography, IconButton, Grid, Button } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  setDarkMode,
  selectDarkMode,
} from "../../../Redux/Slicer/darkModeSlice";
import { setLogin } from "../../../Redux/Slicer/loginSlice";

const LeftNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  const logout = () => {
    window.sessionStorage.removeItem("token");
    dispatch(setLogin());
  };

  return (
    <Grid container>
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
      <Typography>
        سامانه مدیریت اطلاعات بیماران رادیوتراپی - بیمارستان سلامت فردا
      </Typography>
      <Button variant="outlined" onClick={logout}>
        خروج
      </Button>
    </Grid>
  );
};

export default LeftNav;
