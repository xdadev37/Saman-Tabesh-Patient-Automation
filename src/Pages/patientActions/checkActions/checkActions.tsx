import { FC, Fragment, useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  Box,
  ButtonGroup,
  Button,
  Grid,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  setFilesLinks,
  emptyData,
} from "../../../Redux/Slicer/checkActionSlice";
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import axios from "axios";
import TableMapper from "./TableBody/tableMapper";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import { Add, ChevronRight } from "@material-ui/icons";
import InfoBar from "../../../UI/InfoBar";

const CheckActions: FC = () => {
  const selectId = useAppSelector(selectPatientId);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(emptyData());

    const data = async () => {
      const getActionFiles = new Promise((got, failed) => {
        axios
          .get(`http://localhost:3001/optionalForm?PatientId=${selectId}`)
          .then((res) => {
            if ((res.status = 200)) {
              for (let i = 0; i < res.data.length; i++) {
                dispatch(setFilesLinks(res.data[i]));
                got(setLoading(false));
              }
            } else {
              failed(console.log("Failed", res.statusText));
            }
          })
          .catch((error) => {
            failed(console.log(error));
          });
      });

      await getActionFiles;
    };

    data();
  }, [dispatch, selectId]);

  return (
    <Fragment>
      {loading ? (
        <Grid container alignItems="center" direction="column">
          <Skeleton variant="rect" width="95%" height={650} animation="wave" />
          <Skeleton width="95%" />
        </Grid>
      ) : (
        <Fragment>
          <Box
            display="flex"
            marginY={3}
            paddingX={3}
            justifyContent="space-around"
          >
            <InfoBar />
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableMapper />
              </TableBody>
            </Table>
            <Box margin={1}>
              <ButtonGroup variant="contained">
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
            </Box>
          </TableContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CheckActions;
