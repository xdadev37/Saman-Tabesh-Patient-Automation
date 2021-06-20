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
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  setFilesLinks,
  emptyData,
} from "../../../redux/Slicer/CheckDataSlice/checkActionSlice";
import {
  selectPatientId,
  selectPatientFileId,
} from "../../../redux/Slicer/StatePasserSlice/idPasserSlice";
import { setSkeleton } from "../../../redux/Slicer/GlobalReduxUIState/backdropSlice";
import axios from "axios";
import TableMapper from "./TableBody/tableMapper";
import { setActionForm } from "../../../redux/Slicer/StatePasserSlice/actionStatusSlice";
import { Add, ChevronRight } from "@material-ui/icons";

const CheckActions: FC = () => {
  const dispatch = useAppDispatch();
  const selectId = useAppSelector(selectPatientId);
  const patientFileId = useAppSelector(selectPatientFileId);

  useEffect(() => {
    dispatch(emptyData());
    dispatch(setSkeleton(true));

    axios
      .get(
        `https://my-json-server.typicode.com/xdadev37/jsonDatabase/optionalForm?PatientId=${patientFileId}`
      )
      .then((res) => {
        let i = 0;
        const dataLength = res.data.length;

        if (res.status === 200) {
          for (i; i < dataLength; i++) {
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
  }, [dispatch, selectId, patientFileId]);

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
