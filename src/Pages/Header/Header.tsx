import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import RightNav from "./Inputs/RightNav/rightNav";
import LeftNav from "./Inputs/LeftNav/leftNav";

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
            <RightNav />
          </Grid>
          <Grid item>
            <Typography>
              سامانه مدیریت اطلاعات بیماران رادیوتراپی - بیمارستان سلامت فردا
            </Typography>
          </Grid>
          <Grid item>
            <LeftNav />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
