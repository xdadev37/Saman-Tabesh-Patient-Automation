import { Button, Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import mainLogo from "./mainLogo.png";
import { useAppDispatch } from "../../../Redux/hook";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import { useHistory } from "react-router-dom";
import { Home } from "@material-ui/icons";

const space = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        marginLeft: theme.spacing(5),
      },
    },
  })
);

const HeaderTitle: React.FC = () => {
  const classes = space();
  const dispatch = useAppDispatch();
  let history = useHistory();

  const home = () => {
    dispatch(setActionForm("mainPage"));
    history.push("/");
  };

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Button
        style={{ color: "#fff", cursor: "pointer" }}
        onClick={home}
        endIcon={<Home />}
        size="large"
      >
        خانه
      </Button>
      {/* <img
        style={{ cursor: "pointer" }}
        src={mainLogo}
        alt="Logo"
        width="100"
        onClick={home}
      /> */}
    </Grid>
  );
};

export default HeaderTitle;
