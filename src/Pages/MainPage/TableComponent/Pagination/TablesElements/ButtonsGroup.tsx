import { ButtonGroup, Button, TableCell } from "@material-ui/core";
import { DeleteForever, Add } from "@material-ui/icons";
import axios from "axios";
import { useAppDispatch } from "../../../../../Redux/hook";
import { setPatientId } from "../../../../../Redux/Slicer/idPasserSlice";
import { Link } from "react-router-dom";

interface IProps {
  id: number;
}

const ButtonsGroup: React.FC<IProps> = ({ id }) => {
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
    <TableCell>
      <ButtonGroup>
        <Link to="/AddFiles">
          <Button
            onClick={() => {
              dispatch(setPatientId(id));
            }}
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            اقدام جدید
          </Button>
        </Link>
        {/* <Button onClick={()=>{setOpenEdit(true)}} variant="contained" color="primary" startIcon={<Edit />}>
              ویرایش
            </Button>
            <Modal open={openEdit} onClose={()=>{setOpenEdit(false)}}></Modal> */}
        <Button
          onClick={() => deleteAction(id)}
          variant="contained"
          color="secondary"
          startIcon={<DeleteForever />}
        >
          حذف
        </Button>
      </ButtonGroup>
    </TableCell>
  );
};

export default ButtonsGroup;
