import { FC, useState, Fragment } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import MoreDetailsTable from "./MoreDetailsTable/MoreDetailsTable";

interface IProps {
  id: number;
  Name: string;
  FamilyName: string;
  NationalId: string;
  FileNumber: string;
  Avatar: string;
  NationalIdDoc: string;
  Comment: string;
}

const MainTable: FC<IProps> = ({
  id,
  Name,
  FamilyName,
  NationalId,
  FileNumber,
  Avatar,
  NationalIdDoc,
  Comment,
}) => {
  const [open, setOpen] = useState(false);
  const [commentAlert, setCommentAlert] = useState(false);

  const commentDialog = (
    <Dialog open={commentAlert} onClose={() => setCommentAlert(false)}>
      <DialogTitle>
        <span style={{ color: "#ccc" }}>توضیحات تکمیلی : </span>
        &nbsp;
        <span>{`${Name} ${FamilyName}`}</span>
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText>{Comment}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setCommentAlert(false)}
        >
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );

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
        <TableCell>{`تاریخ`}</TableCell>
        <TableCell>{`تاریخ`}</TableCell>
      </TableRow>
      <MoreDetailsTable
        open={open}
        id={id}
        Name={Name}
        FamilyName={FamilyName}
        NationalId={NationalId}
        FileNumber={FileNumber}
        AvatarLink={Avatar}
        NationalIdDoc={NationalIdDoc}
        Comment={Comment}
        setCommentAlert={setCommentAlert}
      />
      {commentDialog}
    </Fragment>
  );
};

export default MainTable;
