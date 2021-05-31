import { FC, useState } from "react";
import {
  ButtonGroup,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { DeleteForever, Add, AmpStories, Edit } from "@material-ui/icons";
import axios from "axios";
import { useAppDispatch } from "../../../../../../../Redux/hook";
import { setPatientId } from "../../../../../../../Redux/Slicer/idPasserSlice";
import { setActionForm } from "../../../../../../../Redux/Slicer/actionStatusSlice";
import { useHistory } from "react-router-dom";
import {
  setName,
  setFamilyName,
  setNationalId,
  setFileNumber,
  setComment,
  setAvatarLink,
  setNationalIdDoc,
} from "../../../../../../../Redux/Slicer/patientInfoSlice";

interface IProps {
  id: number;
  Name: string;
  FamilyName: string;
  NationalId: string;
  FileNumber: string;
  AvatarLink: string;
  NationalIdDoc: string;
  Comment: string;
}

const ButtonsGroup: FC<IProps> = ({
  id,
  Name,
  FamilyName,
  NationalId,
  FileNumber,
  AvatarLink,
  NationalIdDoc,
  Comment,
}) => {
  const dispatch = useAppDispatch();
  let history = useHistory();
  const [openAlert, setOpenAlert] = useState(false);

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
      <DialogTitle>{`از حذف اطلاعات ${Name} ${FamilyName} مطمئن هستید؟`}</DialogTitle>
      <DialogActions>
        <Button onClick={() => setOpenAlert(false)}>لغو</Button>
        <Button color="secondary" onClick={() => deleteAction(id)} autoFocus>
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );

  dispatch(setPatientId(id));

  const tempData = () => {
    dispatch(setName(Name));
    dispatch(setFamilyName(FamilyName));
    dispatch(setNationalId(NationalId));
    dispatch(setFileNumber(FileNumber));
    dispatch(setAvatarLink(AvatarLink));
  };

  return (
    <Grid component="td" container alignItems="center" justify="center">
      <ButtonGroup variant="contained" size="small">
        {/* {noneFiles && ( */}
        <Button
          style={{ backgroundColor: "#2196f3", color: "#fff" }}
          onClick={() => {
            tempData();
            dispatch(setActionForm("checkAction"));
          }}
          startIcon={<AmpStories />}
        >
          مشاهده اقدامات
        </Button>
        {/* )} */}
        <Button
          onClick={() => {
            tempData();
            dispatch(setActionForm("getActionName"));
          }}
          color="primary"
          startIcon={<Add />}
        >
          اقدام جدید
        </Button>
        <Button
          onClick={() => {
            tempData();
            dispatch(setComment(Comment));
            dispatch(setNationalIdDoc(NationalIdDoc));
            dispatch(setActionForm("editUser"));
          }}
          color="default"
          startIcon={<Edit />}
        >
          ویرایش
        </Button>
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
