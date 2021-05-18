import { FC, useState, Fragment } from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import MoreDetailsTable from "./MoreDetailsTable";

interface IProps {
  id: number;
  Name: string;
}

const TableBody: FC<IProps> = ({ id, Name }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{id}</TableCell>
        <TableCell>{Name}</TableCell>
      </TableRow>
      <MoreDetailsTable open={open} id={id} />
    </Fragment>
  );
};

export default TableBody;
