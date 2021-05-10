import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import {
  setOpen,
  selectOpen,
} from "../../../../../Redux/Slicer/collapsibleSlice";

const MainTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpen);

  return (
    <TableRow>
      <TableCell>
        <IconButton size="small" onClick={() => dispatch(setOpen(!open))}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

export default MainTable;
