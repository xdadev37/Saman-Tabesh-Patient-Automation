import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import HeaderTitle from "./Inputs/HeaderTitle";

const Header: React.FC = () => {
  return (
    <AppBar
      style={{
        backgroundImage: "linear-gradient(65deg ,#2962ff 30%, #448aff 70%)",
      }}
    >
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography>
              سامانه مدیریت اطلاعات بیماران رادیوتراپی - بیمارستان سلامت فردا
            </Typography>
          </Grid>
          <Grid item>
            <HeaderTitle />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
