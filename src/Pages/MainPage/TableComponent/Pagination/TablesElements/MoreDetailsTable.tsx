import {
  Table,
  TableRow,
  TableCell,
  Collapse,
  Box,
  TableHead,
  TableBody,
  Avatar,
  Link,
} from "@material-ui/core";
import ButtonsGroup from "./ButtonsGroup";

interface IProps {
  open: boolean;
  id: number;
  AvatarLink: string;
  NationalIdDoc: string;
}

const MoreDetailsTable: React.FC<IProps> = ({
  open,
  id,
  AvatarLink,
  NationalIdDoc,
}) => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <Collapse in={open} unmountOnExit>
          <Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>عکس پرسنلی بیمار</TableCell>
                  <TableCell>کپی کارت ملی بیمار</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Avatar alt="Avatar" src={`${AvatarLink}`} />
                  </TableCell>
                  <TableCell>
                    <Link target="_blank" href={NationalIdDoc}>
                      مشاهده پی دی اف
                    </Link>
                  </TableCell>

                  {/* Buttons */}
                  <ButtonsGroup id={id} />
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default MoreDetailsTable;
