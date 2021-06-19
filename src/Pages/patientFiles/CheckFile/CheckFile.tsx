import { FC, useEffect } from "react";
import axios from "axios";
import InfoBar from "../../../UI/InfoBar";
import {
  Select,
  MenuItem,
  Grid,
  Paper,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { setAllPatientData } from "../../../Redux/Slicer/patientInfoSlice";
import { selectPatientFiles } from "../../../Redux/Slicer/patientFilesSlice";
import { selectPatientId } from "../../../Redux/Slicer/idPasserSlice";
import { setSkeleton } from "../../../Redux/Slicer/backdropSlice";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import { setPatientFileId } from "../../../Redux/Slicer/idPasserSlice";
import { ChevronRight, Edit, DeleteForever } from "@material-ui/icons";

const CheckFile: FC = () => {
  const dispatch = useAppDispatch();
  const patientId = useAppSelector(selectPatientId);
  const patientFileId = useAppSelector(selectPatientFiles);

  useEffect(() => {
    dispatch(setSkeleton(false));

    axios
      .get(`url/${patientId}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAllPatientData(res.data));
          dispatch(setSkeleton(true));
        }
      })
      .catch((error) => console.log(error));
  }, [patientId, dispatch]);

  return (
    <Grid container>
      <Grid item>
        <Grid container>
          <InputLabel htmlFor="fileDropMenu">انتخاب نوع پرونده</InputLabel>
          <Select id="fileDropMenu">
            <MenuItem></MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>شماره پرونده</TableCell>
                <TableCell>نام پزشک</TableCell>
                <TableCell>توضیحات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell style={{ float: "left" }}>
                  <ButtonGroup variant="contained">
                    <Button
                      color="secondary"
                      startIcon={<DeleteForever />}
                      onClick={() => {
                        dispatch(setPatientFileId(patientFileId.id));
                        dispatch(setActionForm("checkAction"));
                      }}
                    >
                      مشاهده اقدامات
                    </Button>
                    <Button
                      color="primary"
                      startIcon={<Edit />}
                      onClick={() => {
                        // dispatch(setActionId(id));
                        // dispatch(setActionName(Name));
                        // dispatch(setActionComment(Comment));
                        dispatch(setActionForm("editAction"));
                      }}
                    >
                      ویرایش
                    </Button>
                    <Button
                      color="secondary"
                      startIcon={<DeleteForever />}
                      // onClick={() => setOpenAlert(true)}
                    >
                      حذف
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button
            onClick={() => dispatch(setActionForm("mainPage"))}
            color="default"
            startIcon={<ChevronRight />}
          >
            برگشت
          </Button>
        </TableContainer>
      </Grid>
      <Grid item>
        <InfoBar />
      </Grid>
    </Grid>
  );
};

export default CheckFile;
