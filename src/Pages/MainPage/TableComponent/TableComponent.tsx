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
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  setName,
  setFamilyName,
  setNationalId,
  setComment,
  setDiagnosis,
  setInsurance,
} from "../../../Redux/Slicer/patientInfoSlice";
import { selectDarkMode } from "../../../Redux/Slicer/darkModeSlice";

const TableComponent: React.FC = () => {
  let history = useHistory();
  const tableHead = [
    "",
    "ردیف",
    "نام",
    "نام خانوادگی",
    "شماره ملی",
    "تاریخ ایجاد",
    "تاریخ ویرایش",
  ];
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);

  const deleteTemp = () => {
    dispatch(setName(""));
    dispatch(setFamilyName(""));
    dispatch(setNationalId(""));
    dispatch(setComment(""));
    dispatch(setDiagnosis(""));
    dispatch(setInsurance(""));
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {tableHead.map((column) => (
              <TableCell
                style={{ backgroundColor: darkMode ? "#616161" : "#fafafa" }}
                key={column}
              >
                {column}
              </TableCell>
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
            deleteTemp();
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
