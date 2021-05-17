import { Link, Grid, makeStyles, createStyles, Theme } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import mainLogo from "./mainLogo.png";

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
  let history = useHistory();
  const classes = space();

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Link
        underline="none"
        style={{ color: "#fff", cursor: "pointer" }}
        onClick={() => history.push("/")}
      >
        خانه
      </Link>
      <img
        style={{ cursor: "pointer" }}
        src={mainLogo}
        alt="Logo"
        width="100"
        onClick={() => history.push("/")}
      />
    </Grid>
  );
};

export default HeaderTitle;
