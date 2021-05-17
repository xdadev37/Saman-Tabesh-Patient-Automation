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
import Pagination from "./Pagination/Pagination";
import { useHistory } from "react-router-dom";

const TableComponent: React.FC = () => {
  let history = useHistory();
  const tableHead = [
    "ردیف",
    "نام",
    "نام خانوادگی",
    "شماره ملی",
    "شماره پرونده",
  ];

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
          onClick={() => history.push("/addNewPatient")}
        >
          اضافه کردن بیمار جدید
        </Button>
      </Box>
    </TableContainer>
  );
};

export default TableComponent;
