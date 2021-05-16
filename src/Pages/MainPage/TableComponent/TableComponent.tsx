import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from "@material-ui/core";
import Pagination from "./Pagination/Pagination";
import { Link } from "react-router-dom";

const TableComponent: React.FC = () => {
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
      <Link to="/addNewPatient">
        <Button color="primary" variant="contained">
          اضافه کردن بیمار جدید
        </Button>
      </Link>
    </TableContainer>
  );
};

export default TableComponent;
