import { FC, useState, Fragment } from "react";
import {
  TableCell,
  IconButton,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  TableRow,
} from "@material-ui/core";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  DeleteForever,
} from "@material-ui/icons";
import MoreDetailsTable from "./MoreDetailsTable/MoreDetailsTable";
import { useAppDispatch, useAppSelector } from "../../../../../Redux/hook";
import {
  setActionId,
  setActionName,
  setActionComment,
} from "../../../../../Redux/Slicer/EditDataSlice/editActionSlice";
import { setActionForm } from "../../../../../Redux/Slicer/StatePasserSlice/actionStatusSlice";
import { selectRequiredField } from "../../../../../Redux/Slicer/AddDataSlice/patientInfoSlice";
import axios from "axios";

interface IProps {
  id: number;
  Name: string;
  PathologyDoc: string;
  TreatmentDoc: string;
  CommitmentDoc: string;
  MRIReportDoc: string;
  CTReportDoc: string;
  PETReportDoc: string;
  SonoReportDoc: string;
  MamoReportDoc: string;
  LabReportDoc: string;
  Comment: string;
}

const TableBody: FC<IProps> = ({
  id,
  Name,
  PathologyDoc,
  TreatmentDoc,
  CommitmentDoc,
  MRIReportDoc,
  CTReportDoc,
  PETReportDoc,
  SonoReportDoc,
  MamoReportDoc,
  LabReportDoc,
  Comment,
}) => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [commentAlert, setCommentAlert] = useState(false);
  const dispatch = useAppDispatch();
  const requiredField = useAppSelector(selectRequiredField);

  const deleteAction = (id: number) => {
    axios
      .delete(
        `https://my-json-server.typicode.com/xdadev37/jsonDatabase/actionName/${id}`
      )
      .then((res) => {
        if ((res.status = 200)) {
          dispatch(setActionForm("checkAction"));
        } else {
          console.log("Action Not Happened", res.statusText);
        }
      });
  };

  const deleteDialog = (
    <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
      <DialogTitle>{`از حذف اقدام ${Name} اطمینان دارید؟`}</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpenAlert(false)}>لغو</Button>
        <Button color="secondary" onClick={() => deleteAction(id)} autoFocus>
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );

  const commentDialog = (
    <Dialog open={commentAlert} onClose={() => setCommentAlert(false)}>
      <DialogTitle>
        <span style={{ color: "#ccc" }}>بیمار</span>
        &nbsp;
        <span>{`${requiredField.Name} ${requiredField.FamilyName}`}</span>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Typography variant="body1">
          <span style={{ color: "#ccc" }}>توضیحات تکمیلی برای اقدام</span>
          &nbsp;
          <span style={{ fontWeight: "bolder" }}>{Name}</span>
        </Typography>
        <DialogContentText>
          <br />
          {Comment}
          <br />
        </DialogContentText>
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
        <TableCell style={{ float: "left" }}>
          <ButtonGroup variant="contained">
            <Button
              color="primary"
              startIcon={<Edit />}
              onClick={() => {
                dispatch(setActionId(id));
                dispatch(setActionName(Name));
                dispatch(setActionComment(Comment));
                dispatch(setActionForm("editAction"));
              }}
            >
              ویرایش
            </Button>
            <Button
              color="secondary"
              startIcon={<DeleteForever />}
              onClick={() => setOpenAlert(true)}
            >
              حذف
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <MoreDetailsTable
        open={open}
        PathologyDoc={PathologyDoc}
        TreatmentDoc={TreatmentDoc}
        CommitmentDoc={CommitmentDoc}
        MRIReportDoc={MRIReportDoc}
        CTReportDoc={CTReportDoc}
        PETReportDoc={PETReportDoc}
        SonoReportDoc={SonoReportDoc}
        MamoReportDoc={MamoReportDoc}
        LabReportDoc={LabReportDoc}
        Comment={Comment}
        setCommentAlert={setCommentAlert}
      />
      {deleteDialog}
      {commentDialog}
    </Fragment>
  );
};

export default TableBody;
