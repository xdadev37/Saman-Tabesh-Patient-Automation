import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  Button,
} from "@material-ui/core";
import Pagination from "./Pagination/Pagination";

const TableComponent: React.FC = () => {
  const tableHead = [
    "ردیف",
    "نام",
    "نام خانوادگی",
    "شماره ملی",
    "شماره پرونده",
  ];

  return (
    <TableContainer>
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
        <TableFooter>
          <Button color="primary" variant="contained">
            اضافه کردن بیمار جدید
          </Button>
        </TableFooter>
      </Table>
      <hr />
    </TableContainer>
  );
};

export default TableComponent;
