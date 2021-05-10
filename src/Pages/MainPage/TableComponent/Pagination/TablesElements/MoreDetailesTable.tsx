import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
} from "@material-ui/core";
import MoreDetailsRow1 from "./MoreDetailsRows/MoreDetailsRow1";
import MoreDetailsRow2 from "./MoreDetailsRows/MoreDetailsRow2";
import ButtonsGroup from "./MoreDetailsRows/ButtonsGroup";
import { useAppSelector } from "../../../../../Redux/hook";
import { selectOpen } from "../../../../../Redux/Slicer/collapsibleSlice";

const MoreDetailsTable: React.FC = () => {
  const open = useAppSelector(selectOpen);

  return (
    <TableRow>
      <TableCell colSpan={6}>
        <Collapse in={open} unmountOnExit>
          <Box>
            <Typography variant="h6">مدارک پیوست</Typography>
            <hr />
            <MoreDetailsRow1 />
            <MoreDetailsRow2 />
            <ButtonsGroup />
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default MoreDetailsTable;
