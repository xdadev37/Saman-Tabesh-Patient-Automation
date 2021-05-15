import { FC, Fragment } from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import {
  setOpen,
  selectOpen,
} from "../../../../../Redux/Slicer/collapsibleSlice";
import { selectDataGrids } from "../../../../../Redux/Slicer/dataGridSlice";

const MainTable: FC = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOpen);
  const selectGotDataGrid = useAppSelector(selectDataGrids);

  return (
    <Fragment>
      {selectGotDataGrid.map((data) => (
        <TableRow key={data.patientId}>
          <TableCell>
            <IconButton size="small" onClick={() => dispatch(setOpen(!open))}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell>{data.patientId}</TableCell>
          <TableCell>{data.name}</TableCell>
          <TableCell>{data.familyName}</TableCell>
          <TableCell>{data.nationalId}</TableCell>
          <TableCell>{data.fileNumber}</TableCell>
        </TableRow>
      ))}
    </Fragment>
  );
};

export default MainTable;
