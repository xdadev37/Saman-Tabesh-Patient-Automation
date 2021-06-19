import { FC, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  ButtonGroup,
  Button,
  Grid,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  setFilesLinks,
  emptyData,
} from "../../../Redux/Slicer/checkActionSlice";
import {
  selectPatientId,
  selectPatientFileId,
} from "../../../Redux/Slicer/idPasserSlice";
import { setSkeleton } from "../../../Redux/Slicer/backdropSlice";
import axios from "axios";
import TableMapper from "./TableBody/tableMapper";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import { Add, ChevronRight } from "@material-ui/icons";
import InfoBar from "../../../UI/InfoBar";

const CheckActions: FC = () => {
  const dispatch = useAppDispatch();
  const selectId = useAppSelector(selectPatientId);
  const patientFileId = useAppSelector(selectPatientFileId);

  useEffect(() => {
    dispatch(emptyData());

    axios
      .get(
        `https://my-json-server.typicode.com/xdadev37/jsonDatabase/optionalForm?PatientId=${patientFileId}`
      )
      .then((res) => {
        if (res.status === 200) {
          for (let i = 0; i < res.data.length; i++) {
            dispatch(setFilesLinks(res.data[i]));
            dispatch(setSkeleton(false));
          }
        } else {
          console.log("Failed", res.statusText);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, selectId]);

  return (
    <Grid container>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableMapper />
          </TableBody>
        </Table>
        <ButtonGroup variant="contained" style={{ margin: 20 }}>
          <Button
            onClick={() => dispatch(setActionForm("getActionName"))}
            color="primary"
            startIcon={<Add />}
          >
            اقدام جدید
          </Button>
          <Button
            onClick={() => dispatch(setActionForm("mainPage"))}
            color="default"
            startIcon={<ChevronRight />}
          >
            برگشت
          </Button>
        </ButtonGroup>
      </TableContainer>
    </Grid>
  );
};

export default CheckActions;
