import { AppBar, Toolbar, Grid, Typography } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import HeaderTitle from "./Inputs/HeaderTitle";
import LoginButton from "./Inputs/LoginButton";

const label = makeStyles((theme: Theme) =>
  createStyles({
    labelBreakPoint: {
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
  })
);

const Header: React.FC = () => {
  const classes = label();

  return (
    <AppBar>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <LoginButton />
          </Grid>
          <Typography variant="h6" className={classes.labelBreakPoint}>
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
