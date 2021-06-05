import { FormControlLabel, Grid } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import {
  setDarkMode,
  selectDarkMode,
} from "../../../../Redux/Slicer/darkModeSlice";
import IOSSwitch from "./darkModeToggle";
import Profile from "./Profile";
import { MyAvatar } from "../../../../UI/Avatar";

const LeftNav: React.FC = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <Grid container alignItems="baseline">
      <Grid item>
        <FormControlLabel
          label={darkMode ? "حالت شب" : "حالت روز"}
          control={
            <IOSSwitch
              checked={darkMode}
              onChange={() => dispatch(setDarkMode())}
            />
          }
        />
      </Grid>
      <Grid item>
        <Profile />
      </Grid>
      <Grid item>
        <MyAvatar alt="Avatar" src="" style={{ alignItems: "center" }}>
          آ
        </MyAvatar>
      </Grid>
    </Grid>
  );
};

export default LeftNav;
