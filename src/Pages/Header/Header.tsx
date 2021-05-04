import { AppBar, Toolbar, Grid } from "@material-ui/core";
import HeaderTitle from "./Inputs/HeaderTitle";
import LoginButton from "./Inputs/LoginButton";

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <HeaderTitle />
          <LoginButton />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
