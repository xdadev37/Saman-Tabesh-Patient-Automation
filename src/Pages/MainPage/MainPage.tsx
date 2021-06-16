import { FC, useState, useEffect } from "react";
import Options from "./Options/Options";
import PageCounter from "./Options/PageCounter";
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import TableComponent from "./TableComponent/TableComponent";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { setDataGrid, emptyData } from "../../Redux/Slicer/dataGridSlice";
import { selectActionForm } from "../../Redux/Slicer/actionStatusSlice";
import axios from "axios";
import GetActionName from "../patientActions/newAction/ModalEntry";
import CheckAction from "../patientActions/checkActions/checkActions";
import EditUser from "../Edit/EditUser/EditUser";
import EditFiles from "../Edit/EditAction/EditActionName";
import AddFile from "../AddFile/AddFile";

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const actionForm = useAppSelector(selectActionForm);

  useEffect(() => {
    dispatch(emptyData());
    axios
      .get(
        "https://my-json-server.typicode.com/xdadev37/jsonDatabase/requiredForm"
      )
      .then((res) => {
        if (res.status === 200) {
          for (let i = 0; i < res.data.length; i++) {
            dispatch(setDataGrid(res.data[i]));
          }

          setLoading(false);
        } else {
          console.log("Failed", res.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const MainPageRender = (
    <Grid container>
      {loading ? (
        <Grid container>
          <Skeleton variant="rect" width="100%" height={650} animation="wave" />
          <Skeleton width="100%" />
        </Grid>
      ) : (
        <Grid container justify="center" alignItems="baseline">
          <Grid item sm={12} md={12} lg={12}>
            <Options />
          </Grid>
          <Grid item sm={12} md={12} lg={12} style={{ marginBottom: 30 }}>
            <PageCounter />
          </Grid>
          <Grid item sm={12} md={12} lg={12}>
            <TableComponent />
          </Grid>
        </Grid>
      )}
    </Grid>
  );

  let Page = <></>;
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

    case "addFile":
      Page = <AddFile />;
      break;

    default:
      Page = MainPageRender;
  }

  return Page;
};

export default MainPage;
