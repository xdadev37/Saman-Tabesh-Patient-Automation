import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Brightness4 } from "@material-ui/icons";
import HeaderTitle from "./Inputs/HeaderTitle";

interface IProps {
  setDarkMode: (arg: boolean) => void;
  darkMode: boolean;
}

const Header: React.FC<IProps> = ({ darkMode, setDarkMode }) => {
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
                if (darkMode) {
                  setDarkMode(false);
                } else {
                  setDarkMode(true);
                }
              }}
            >
              <Brightness4 />
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
