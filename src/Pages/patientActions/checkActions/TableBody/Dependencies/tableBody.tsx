import { FC, useState, Fragment } from "react";
import {
  TableCell,
  IconButton,
  Button,
  ButtonGroup,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import {
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  DeleteForever,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import MoreDetailsTable from "./MoreDetailsTable/MoreDetailsTable";
import { useAppDispatch } from "../../../../../Redux/hook";
import {
  setActionId,
  setActionName,
  setActionComment,
} from "../../../../../Redux/Slicer/editActionSlice";
import { setActionForm } from "../../../../../Redux/Slicer/actionStatusSlice";
import axios from "axios";

const useRowStyles = makeStyles({
  root: {
    borderBottom: "1px solid #ccc",
    "& > * > *": {
      border: "unset",
    },
  },
});

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
  const dispatch = useAppDispatch();
  const classes = useRowStyles();

  const deleteAction = async (id: number) => {
    const deletePromise = new Promise((deleted, failed) => {
      axios.delete(`http://localhost:3003/actionName/${id}`).then((res) => {
        if ((res.status = 200)) {
          deleted(dispatch(setActionForm("checkAction")));
        } else {
          failed(console.log("Action Not Happened", res.statusText));
        }
      });
    });

    await deletePromise;
  };

  const deleteDialog = (
    <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
      <DialogTitle>از حذف اطلاعات بیمار مطمئن هستید؟</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpenAlert(false)}>لغو</Button>
        <Button color="secondary" onClick={() => deleteAction(id)} autoFocus>
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Fragment>
      <Grid
        container
        justify="space-between"
        component="tr"
        className={classes.root}
      >
        <Grid item component="td">
          <TableCell component="div">
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="p">{id}</TableCell>
          <TableCell component="p">{Name}</TableCell>
        </Grid>
        <Grid item component="td">
          <TableCell component="p">{`توضیحات : ${
            Comment === "" ? "ندارد" : Comment
          }`}</TableCell>
        </Grid>
        <Grid item component="td">
          <TableCell component="div">
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
        </Grid>
      </Grid>
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
      />
      {deleteDialog}
    </Fragment>
  );
};

export default TableBody;
