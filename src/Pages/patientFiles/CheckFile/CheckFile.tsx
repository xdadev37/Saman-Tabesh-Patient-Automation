import { FC, useEffect, Fragment } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { setAllPatientData } from "../../../redux/Slicer/AddDataSlice/patientInfoSlice";
import { selectPatientFiles } from "../../../redux/Slicer/AddDataSlice/patientFilesSlice";
import {
  selectPatientId,
  setPatientFileId,
  selectPatientFileId,
} from "../../../redux/Slicer/StatePasserSlice/idPasserSlice";
import { setSkeleton } from "../../../redux/Slicer/GlobalReduxUIState/backdropSlice";
import { setActionForm } from "../../../redux/Slicer/StatePasserSlice/actionStatusSlice";
import { selectAddFilesData } from "../../../redux/Slicer/CachedDataSlice/addFilesDataSlice";
import { ChevronRight, Edit, DeleteForever } from "@material-ui/icons";

const CheckFile: FC = () => {
  const dispatch = useAppDispatch();
  const patientId = useAppSelector(selectPatientId);
  const patientFiles = useAppSelector(selectPatientFiles);
  const addFilesData = useAppSelector(selectAddFilesData);
  const patientFileId = useAppSelector(selectPatientFileId);

  useEffect(() => {
    dispatch(setSkeleton(true));

    axios
      .get(`url/${patientId}`)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setAllPatientData(res.data));
          dispatch(setSkeleton(false));
        }
      })
      .catch((error) => console.log(error));
  }, [patientId, dispatch]);

  const submit = () => {
    dispatch(setSkeleton(true));

    axios.get(`url/${patientFileId}`).then((res) => {
      if (res.status === 200) {
        
      }
    });
  };

  return (
    <Grid container>
      <Grid item>
        <Grid container>
          <InputLabel htmlFor="fileDropMenu">انتخاب نوع پرونده</InputLabel>
          <Select id="fileDropMenu">
            {addFilesData.map((data) => (
              <MenuItem key={data.id} value={data.id}></MenuItem>
            ))}
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
                {patientFiles.map((data) => (
                  <Fragment key={data.id}>
                    <TableCell>{data.fileNumber}</TableCell>
                    <TableCell>{data.physicianName}</TableCell>
                    <TableCell>{data.comment}</TableCell>
                    <TableCell style={{ float: "left" }}>
                      <ButtonGroup variant="contained">
                        <Button
                          color="secondary"
                          startIcon={<DeleteForever />}
                          onClick={() => {
                            dispatch(setPatientFileId(data.id));
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
                  </Fragment>
                ))}
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
