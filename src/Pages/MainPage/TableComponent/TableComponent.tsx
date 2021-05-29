import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Box,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Pagination from "./Pagination/Pagination";
import { useHistory } from "react-router-dom";
import {
  setName,
  setFamilyName,
  setNationalId,
  setFileNumber,
} from "../../../Redux/Slicer/patientInfoSlice";
import { useAppDispatch } from "../../../Redux/hook";

const TableComponent: React.FC = () => {
  let history = useHistory();
  const tableHead = [
    "ردیف",
    "نام",
    "نام خانوادگی",
    "شماره ملی",
    "شماره پرونده",
  ];
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHead.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <Pagination />
        </TableBody>
      </Table>
      <Box margin={1}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            dispatch(setName(""));
            dispatch(setFamilyName(""));
            dispatch(setNationalId(""));
            dispatch(setFileNumber(""));
            history.push("/addNewPatient");
          }}
          startIcon={<Add />}
        >
          ایجاد فرم بیمار جدید
        </Button>
      </Box>
    </TableContainer>
  );
};

export default TableComponent;
