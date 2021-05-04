import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
} from "@material-ui/core";
import { ICollapsible } from "./Collapsible";
import MoreDetailesRow1 from "./MoreDetailesRows/MoreDetailesRow1";
import MoreDetailesRow2 from "./MoreDetailesRows/MoreDetailesRow2";
import ButtonsGroup from "./MoreDetailesRows/ButtonsGroup";

const MoreDetailsTable: React.FC<ICollapsible> = ({ open, setOpen }) => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <Collapse in={open} unmountOnExit>
          <Box>
            <Typography variant="h6">مدارک پیوست</Typography>
            <hr />
            <MoreDetailesRow1 open={open} setOpen={setOpen} />
            <MoreDetailesRow2 open={open} setOpen={setOpen} />
            <ButtonsGroup />
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default MoreDetailsTable;
