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
import { makeStyles } from "@material-ui/core/styles";
import ButtonsGroup from "./ButtonsGroup";

interface IProps {
  open: boolean;
  id: number;
  AvatarLink: string;
  NationalIdDoc: string;
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const MoreDetailsTable: React.FC<IProps> = ({
  open,
  id,
  AvatarLink,
  NationalIdDoc,
}) => {
  const classes = useRowStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell colSpan={6}>
        <Collapse in={open} mountOnEnter unmountOnExit>
          <Box margin={1}>
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
                    <Avatar alt="Avatar" src={AvatarLink} />
                  </TableCell>
                  <TableCell>
                    <Link target="_blank" href={NationalIdDoc} rel="noreferrer">
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
