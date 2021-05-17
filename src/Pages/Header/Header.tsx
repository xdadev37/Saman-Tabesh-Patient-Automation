import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import HeaderTitle from "./Inputs/HeaderTitle";
import LoginButton from "./Inputs/LoginButton";

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <LoginButton />
          </Grid>
          <Typography variant="h6">
            سامانه مدیریت اطلاعات بیماران رادیوتراپی - بیمارستان سلامت فردا
          </Typography>
          <Grid item>
            <HeaderTitle />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
