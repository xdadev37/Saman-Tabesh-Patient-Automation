import { FC, Fragment, useState, useEffect } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  Box,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      marginTop: theme.spacing(10),
    },
  })
);

const CheckActions: FC = () => {
  const selectId = useAppSelector(selectPatientId);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const classes = useStyle();

  const data = async () => {
    dispatch(emptyData());
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
        <Box marginTop={10} paddingX={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableMapper />
              </TableBody>
            </Table>
            <Box margin={1}>
              <Button onClick={() => dispatch(setActionForm("mainPage"))}>
                برگشت
              </Button>
            </Box>
          </TableContainer>
        </Box>
      )}
    </Fragment>
  );
};

export default CheckActions;