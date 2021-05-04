import Options from "./Options/Options";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import TableComponent from "./TableComponent/TableComponent";
import InfoCard from "./Card/InfoCard";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      marginTop: theme.spacing(10),
    },
  })
);

const MainPage: React.FC = () => {
  const classes = useStyle();

  return (
    <Grid container className={classes.marginTop} justify="space-around">
      <Grid item sm={6}>
        <Options />
        <TableComponent />
      </Grid>
      <Grid item sm={5}>
        <InfoCard />
      </Grid>
    </Grid>
  );
};

export default MainPage;
