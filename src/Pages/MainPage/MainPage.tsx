import { FC, useEffect } from "react";
import Options from "./Options/Options";
import PageCounter from "./Options/PageCounter";
import { Grid } from "@material-ui/core";
import TableComponent from "./TableComponent/TableComponent";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { setDataGrid, emptyData } from "../../Redux/Slicer/CheckDataSlice/dataGridSlice";
import { selectActionForm } from "../../Redux/Slicer/StatePasserSlice/actionStatusSlice";
import { setSkeleton } from "../../Redux/Slicer/GlobalReduxUIState/backdropSlice";
import axios from "axios";
import GetActionName from "../patientActions/newAction/ModalEntry";
import CheckAction from "../patientActions/checkActions/checkActions";
import EditUser from "../Edit/EditUser/EditUser";
import EditAction from "../Edit/EditAction/EditActionName";
import AddFile from "../patientFiles/AddFile/AddFile";
import CheckFile from "../patientFiles/CheckFile/CheckFile";

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const actionForm = useAppSelector(selectActionForm);

  useEffect(() => {
    dispatch(emptyData());
    dispatch(setSkeleton(true));

    axios
      .get(
        "https://my-json-server.typicode.com/xdadev37/jsonDatabase/requiredForm"
      )
      .then((res) => {
        let i = 0;
        const dataLength = res.data.length;

        if (res.status === 200) {
          for (i; i < dataLength; i++) {
            dispatch(setDataGrid(res.data[i]));
          }

          dispatch(setSkeleton(false));
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

    case "addFile":
      Page = <AddFile />;
      break;

    case "checkAction":
      Page = <CheckAction />;
      break;

    case "editUser":
      Page = <EditUser />;
      break;

    case "editAction":
      Page = <EditAction />;
      break;

    case "checkFile":
      Page = <CheckFile />;
      break;

    default:
      Page = MainPageRender;
  }

  return Page;
};

export default MainPage;
