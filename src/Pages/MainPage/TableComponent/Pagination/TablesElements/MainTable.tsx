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
  row: number;
  id: string;
  Name: string;
  FamilyName: string;
  NationalId: string;
  Avatar: string;
  DiagnosisId: string;
  Comment: string;
}

const MainTable: FC<IProps> = ({
  row,
  id,
  Name,
  FamilyName,
  NationalId,
  Avatar,
  DiagnosisId,
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
        <TableCell>{row}</TableCell>
        <TableCell>{Name}</TableCell>
        <TableCell>{FamilyName}</TableCell>
        <TableCell>{NationalId}</TableCell>
        <TableCell>{`تاریخ`}</TableCell>
        <TableCell>{`تاریخ`}</TableCell>
      </TableRow>
      <MoreDetailsTable
        open={open}
        id={id}
        Name={Name}
        FamilyName={FamilyName}
        NationalId={NationalId}
        Avatar={Avatar}
        DiagnosisId={DiagnosisId}
        Comment={Comment}
        setCommentAlert={setCommentAlert}
      />
      {commentDialog}
    </Fragment>
  );
};

export default MainTable;
