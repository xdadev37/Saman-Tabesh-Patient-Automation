import { Link, Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import mainLogo from "./mainLogo.png";
import { useAppDispatch } from "../../../Redux/hook";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";

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

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Link
        underline="none"
        style={{ color: "#fff", cursor: "pointer" }}
        onClick={() => dispatch(setActionForm("mainPage"))}
      >
        خانه
      </Link>
      <img
        style={{ cursor: "pointer" }}
        src={mainLogo}
        alt="Logo"
        width="100"
        onClick={() => dispatch(setActionForm("mainPage"))}
      />
    </Grid>
  );
};

export default HeaderTitle;
