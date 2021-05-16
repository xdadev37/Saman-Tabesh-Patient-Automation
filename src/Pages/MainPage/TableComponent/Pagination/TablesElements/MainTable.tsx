import { FC, useState, Fragment } from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import MoreDetailsTable from "./MoreDetailsTable";

interface IProps {
  id: number;
  Name: string;
  FamilyName: string;
  NationalId: number;
  FileNumber: number;
  Avatar: string;
  NationalIdDoc: string;
}

const MainTable: FC<IProps> = ({
  id,
  Name,
  FamilyName,
  NationalId,
  FileNumber,
  Avatar,
  NationalIdDoc,
}) => {
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
        <TableCell>{FamilyName}</TableCell>
        <TableCell>{NationalId}</TableCell>
        <TableCell>{FileNumber}</TableCell>
      </TableRow>
      <MoreDetailsTable
        open={open}
        id={id}
        AvatarLink={Avatar}
        NationalIdDoc={NationalIdDoc}
      />
    </Fragment>
  );
};

export default MainTable;
