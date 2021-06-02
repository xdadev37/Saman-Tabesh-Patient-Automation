import { FC, Fragment, useState, useEffect } from "react";
import Options from "./Options/Options";
import PageCounter from "./Options/PageCounter";
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import TableComponent from "./TableComponent/TableComponent";
import InfoCard from "./Card/InfoCard";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { setDataGrid, emptyData } from "../../Redux/Slicer/dataGridSlice";
import { selectActionForm } from "../../Redux/Slicer/actionStatusSlice";
import axios from "axios";
import GetActionName from "../patientActions/newAction/getActionName";
import CheckAction from "../patientActions/checkActions/checkActions";
import EditUser from "../Edit/EditUser/EditUser";
import EditFiles from "../Edit/EditAction/EditActionName";

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const actionForm = useAppSelector(selectActionForm);

  useEffect(() => {
    const data = async () => {
      dispatch(emptyData());
      const getData = new Promise((got, failed) => {
        axios
          .get("http://10.111.111.102:3002/requiredForm")
          .then((res) => {
            if (res.status === 200) {
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
        <Grid container alignItems="center" direction="column">
          <Skeleton variant="rect" width="95%" height={650} animation="wave" />
          <Skeleton width="95%" />
        </Grid>
      ) : (
        <Grid container justify="center" alignItems="baseline">
          <Grid item sm={12} md={8} lg={8}>
            <Options />
          </Grid>
          <Grid
            item
            sm={12}
            md={4}
            lg={4}
            style={{ marginTop: 30, marginBottom: 30 }}
          >
            <InfoCard />
          </Grid>
          <Grid item sm={12} md={12} lg={12}>
            <TableComponent />
          </Grid>
          <Grid item sm={12} md={12} lg={12} style={{ marginTop: 30 }}>
            <PageCounter />
          </Grid>
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

    case "editAction":
      Page = <EditFiles />;
      break;

    default:
      Page = MainPageRender;
  }

  return Page;
};

export default MainPage;
