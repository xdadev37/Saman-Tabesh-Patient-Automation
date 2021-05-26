import { FC, Fragment, useState, useEffect } from "react";
import Options from "./Options/Options";
import PageCounter from "./Options/PageCounter";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import TableComponent from "./TableComponent/TableComponent";
import InfoCard from "./Card/InfoCard";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { setDataGrid, emptyData } from "../../Redux/Slicer/dataGridSlice";
import { selectActionForm } from "../../Redux/Slicer/actionStatusSlice";
import axios from "axios";
import GetActionName from "../patientActions/newAction/getActionName";
import CheckAction from "../patientActions/checkActions/checkActions";
import AlertSnackbar from "../../UI/AlertSnackbar";
import {
  selectAlertText,
  selectAlertStatus,
  selectOpen,
} from "../../Redux/Slicer/alertMessageSlice";
import EditUser from "../Edit/EditUser/EditUser";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    marginY: {
      marginTop: theme.spacing(10),
      "& > *": { paddingInline: theme.spacing(3) },
      marginBottom: theme.spacing(3),
    },
    midMargin: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  })
);

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const classes = useStyle();
  const [loading, setLoading] = useState(true);
  const actionForm = useAppSelector(selectActionForm);
  const alertText = useAppSelector(selectAlertText);
  const alertStatus = useAppSelector(selectAlertStatus);
  const open = useAppSelector(selectOpen);

  useEffect(() => {
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

    data();
  }, [dispatch]);

  const MainPageRender = (
    <Fragment>
      {loading ? (
        <Grid
          container
          className={classes.marginY}
          alignItems="center"
          direction="column"
        >
          <Skeleton variant="rect" width="95%" height={650} animation="wave" />
          <Skeleton width="95%" />
        </Grid>
      ) : (
        <Grid
          container
          className={classes.marginY}
          justify="center"
          alignItems="baseline"
        >
          <Grid item sm={12} md={8} lg={8}>
            <Options />
          </Grid>
          <Grid item sm={12} md={4} lg={4} className={classes.midMargin}>
            <InfoCard />
          </Grid>
          <Grid item className={classes.midMargin} sm={12} md={12} lg={12}>
            <TableComponent />
          </Grid>
          <PageCounter />
        </Grid>
      )}
    </Fragment>
  );

  let Page = <Fragment></Fragment>;
  switch (actionForm) {
    case "getActionName":
      Page = <GetActionName />;
      break;

    case "mainPage":
      Page = MainPageRender;
      break;

    case "checkAction":
      Page = <CheckAction />;
      break;

    case "editUser":
      Page = <EditUser />;
      break;

    default:
      Page = MainPageRender;
  }

  return (
    <Fragment>
      {Page}
      <AlertSnackbar open={open} alertStatus={alertStatus}>
        {alertText}
      </AlertSnackbar>
      {/* <Backdrop open={pending}>
        <CircularProgress />
      </Backdrop> */}
    </Fragment>
  );
};

export default MainPage;
