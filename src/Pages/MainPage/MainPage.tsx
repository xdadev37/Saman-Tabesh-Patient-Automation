import { FC, Fragment, useState, useEffect } from "react";
import Options from "./Options/Options";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import TableComponent from "./TableComponent/TableComponent";
import InfoCard from "./Card/InfoCard";
import { useAppDispatch } from "../../Redux/hook";
import { setDataGrid, emptyData } from "../../Redux/Slicer/dataGridSlice";
import axios from "axios";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      marginTop: theme.spacing(10),
    },
    midMarginTop: {
      marginTop: theme.spacing(3),
    },
  })
);

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const [loading, setLoading] = useState(true);

  const data = async () => {
    dispatch(emptyData());
    const getData = new Promise((got, failed) => {
      axios
        .get("http://localhost:3002/requiredForm")
        .then((res) => {
          if ((res.status = 200)) {
            for (let i = 0; i < res.data.length; i++) {
              dispatch(setDataGrid(res.data[i]));
            }

            got(setLoading(false));
          } else {
            failed(console.log("Failed", res.statusText));
          }
        })
        .catch((error) => {
          failed(console.log(error));
        });
    });

    await getData;
  };

  useEffect(() => {
    data();
  });

  return (
    <Fragment>
      {loading ? (
        <Grid
          container
          className={classes.marginTop}
          alignItems="center"
          direction="column"
        >
          <Skeleton variant="rect" width="95%" height={650} animation="wave" />
          <Skeleton width="95%" />
        </Grid>
      ) : (
        <Grid container className={classes.marginTop} justify="space-around">
          <Grid item sm={6}>
            <Options />
            <Grid item className={classes.midMarginTop}>
              <TableComponent />
            </Grid>
          </Grid>
          <Grid item sm={5}>
            <InfoCard />
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default MainPage;
