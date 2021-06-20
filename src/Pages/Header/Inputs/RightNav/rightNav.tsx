import { Button, Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
// import mainLogo from "./mainLogo.png";
import { useAppDispatch } from "../../../../redux/hook";
import { setActionForm } from "../../../../redux/Slicer/StatePasserSlice/actionStatusSlice";
import { useHistory } from "react-router-dom";
import { Home } from "@material-ui/icons";

const space = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        marginInline: theme.spacing(1),
      },
    },
  })
);

const RightNav: React.FC = () => {
  const classes = space();
  const dispatch = useAppDispatch();
  let history = useHistory();

  const home = () => {
    dispatch(setActionForm("mainPage"));
    history.push("/");
  };

  return (
    <Grid container alignItems="center" className={classes.root}>
      {/* <img
        style={{ cursor: "pointer" }}
        src={mainLogo}
        alt="Logo"
        width="100"
        onClick={home}
      /> */}

      <Button
        style={{ color: "#fff", cursor: "pointer" }}
        onClick={home}
        startIcon={<Home />}
        size="large"
      >
        خانه
      </Button>
    </Grid>
  );
};

export default RightNav;
