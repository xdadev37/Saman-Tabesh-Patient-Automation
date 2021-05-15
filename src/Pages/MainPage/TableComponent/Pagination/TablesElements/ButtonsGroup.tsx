import { FC, Fragment, useState } from "react";
import { ButtonGroup, Button, TableCell, Modal } from "@material-ui/core";
import { DeleteForever, Add } from "@material-ui/icons";
import { useAppSelector } from "../../../../../Redux/hook";
import { selectDataGrids } from "../../../../../Redux/Slicer/dataGridSlice";
import axios from "axios";
import NewActionForm from "../../../../AddFilesPage/optionalFields";
import { useAppDispatch } from "../../../../../Redux/hook";
import { setPatientId } from "../../../../../Redux/Slicer/idPasserSlice";

const ButtonsGroup: FC = () => {
  const selectId = useAppSelector(selectDataGrids);
  const [openNewAction, setOpenNewAction] = useState(false);
  const dispatch = useAppDispatch();
  // const [openEdit, setOpenEdit] = useState(false);

  const deleteAction = async (id: number) => {
    const deletePromise = new Promise((deleted, failed) => {
      axios.delete(`http://localhost:3001/optionalForm/${id}`).then((res) => {
        if ((res.status = 200)) {
          deleted(window.location.reload());
        } else {
          failed(console.log("Action Not Happened", res.statusText));
        }
      });
    });

    await deletePromise;
  };

  return (
    <Fragment>
      {selectId.map((data) => (
        <TableCell key={data.patientId}>
          <ButtonGroup>
            <Button
              onClick={() => {
                dispatch(setPatientId(data.patientId));
                setOpenNewAction(true);
              }}
              variant="contained"
              color="primary"
              startIcon={<Add />}
            >
              اقدام جدید
            </Button>
            <Modal
              open={openNewAction}
              onClose={() => {
                setOpenNewAction(false);
              }}
            >
              <NewActionForm />
            </Modal>
            {/* <Button onClick={()=>{setOpenEdit(true)}} variant="contained" color="primary" startIcon={<Edit />}>
              ویرایش
            </Button>
            <Modal open={openEdit} onClose={()=>{setOpenEdit(false)}}></Modal> */}
            <Button
              onClick={() => deleteAction(data.patientId)}
              variant="contained"
              color="secondary"
              startIcon={<DeleteForever />}
            >
              حذف
            </Button>
          </ButtonGroup>
        </TableCell>
      ))}
    </Fragment>
  );
};

export default ButtonsGroup;
