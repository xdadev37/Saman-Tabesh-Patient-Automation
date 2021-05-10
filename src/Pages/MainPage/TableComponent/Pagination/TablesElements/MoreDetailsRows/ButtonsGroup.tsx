import {
  ButtonGroup,
  Button,
  Table,
  TableHead,
  TableCell,
} from "@material-ui/core";
import { DeleteForever, Edit } from "@material-ui/icons";

const ButtonsGroup: React.FC = () => {
  return (
    <Table>
      <TableHead>
        <TableCell>
          <ButtonGroup>
            <Button variant="contained" color="primary" startIcon={<Edit />}>
              ویرایش
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteForever />}
            >
              حذف
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableHead>
    </Table>
  );
};

export default ButtonsGroup;
