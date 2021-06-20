import { FC, useState, Fragment } from "react";
import {
  ButtonGroup,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { DeleteForever, Add, AmpStories, Edit } from "@material-ui/icons";
import axios from "axios";
import { useAppDispatch } from "../../../../../../../redux/hook";
import { setPatientId } from "../../../../../../../redux/Slicer/StatePasserSlice/idPasserSlice";
import { setActionForm } from "../../../../../../../redux/Slicer/StatePasserSlice/actionStatusSlice";
import { useHistory } from "react-router-dom";
import {
  setName,
  setFamilyName,
  setNationalId,
  setComment,
  setDiagnosisId,
  // setAvatar,
} from "../../../../../../../redux/Slicer/AddDataSlice/patientInfoSlice";

interface IProps {
  id: string;
  Name: string;
  FamilyName: string;
  NationalId: string;
  Avatar: string;
  DiagnosisId: string;
  Comment: string;
}

const ButtonsGroup: FC<IProps> = ({
  id,
  Name,
  FamilyName,
  NationalId,
  Avatar,
  DiagnosisId,
  Comment,
}) => {
  const dispatch = useAppDispatch();
  let history = useHistory();
  const [openAlert, setOpenAlert] = useState(false);

  const deleteAction = (id: string) => {
    axios
      .delete(
        `https://my-json-server.typicode.com/xdadev37/jsonDatabase/requiredForm/${id}`
      )
      .then((res) => {
        if (res.status === 200) {
          history.push("/");
        } else {
          console.log("Action Not Happened", res.statusText);
        }
      });
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
    dispatch(setComment(Comment));
  };

  return (
    <Fragment>
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
          مشاهده پرونده
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
            dispatch(setDiagnosisId(DiagnosisId));
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
    </Fragment>
  );
};

export default ButtonsGroup;
