import { FC, useState } from "react";
import {
  ButtonGroup,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { DeleteForever, Add, AmpStories } from "@material-ui/icons";
import axios from "axios";
import { useAppDispatch } from "../../../../../Redux/hook";
import { setPatientId } from "../../../../../Redux/Slicer/idPasserSlice";
import { setActionForm } from "../../../../../Redux/Slicer/actionStatusSlice";
import { useHistory } from "react-router-dom";

interface IProps {
  id: number;
}

const ButtonsGroup: FC<IProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  let history = useHistory();
  const [openAlert, setOpenAlert] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);

  const deleteAction = async (id: number) => {
    const deletePromise = new Promise((deleted, failed) => {
      axios.delete(`http://localhost:3002/requiredForm/${id}`).then((res) => {
        if ((res.status = 200)) {
          deleted(history.push("/"));
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
    <Grid component="td" container alignItems="center" justify="center">
      <ButtonGroup variant="contained">
        <Button
          style={{ backgroundColor: "#2196f3", color: "#fff" }}
          onClick={() => {
            dispatch(setPatientId(id));
            dispatch(setActionForm("checkAction"));
          }}
          startIcon={<AmpStories />}
        >
          مشاهده اقدامات
        </Button>
        <Button
          onClick={() => {
            dispatch(setPatientId(id));
            dispatch(setActionForm("getActionName"));
          }}
          color="primary"
          startIcon={<Add />}
        >
          اقدام جدید
        </Button>
        {/* <Button onClick={()=>{setOpenEdit(true)}} variant="contained" color="primary" startIcon={<Edit />}>
              ویرایش
            </Button>
            <Modal open={openEdit} onClose={()=>{setOpenEdit(false)}}></Modal> */}
        <Button
          onClick={() => setOpenAlert(true)}
          color="secondary"
          startIcon={<DeleteForever />}
        >
          حذف
        </Button>
      </ButtonGroup>
      {deleteDialog}
    </Grid>
  );
};

export default ButtonsGroup;
