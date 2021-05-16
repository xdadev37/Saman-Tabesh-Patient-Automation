import { AppBar, Toolbar, Grid } from "@material-ui/core";
import HeaderTitle from "./Inputs/HeaderTitle";
import LoginButton from "./Inputs/LoginButton";
import { Link } from "react-router-dom";
import mainLogo from "./mainLogo.png";

const Header: React.FC = () => {
  return (
    <AppBar>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <LoginButton />
          <HeaderTitle />
          <Link to="/">
            <img src={mainLogo} alt="Logo" width="100" />
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
