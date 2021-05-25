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
import ButtonsGroup from "./ButtonsGroup/ButtonsGroup";

interface IProps {
  open: boolean;
  id: number;
  AvatarLink: string;
  NationalIdDoc: string;
  Comment: string;
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
  Comment,
}) => {
  const classes = useRowStyles();

  return (
    <TableRow className={classes.root}>
      <TableCell colSpan={6}>
        <Collapse
          in={open}
          mountOnEnter
          unmountOnExit
          style={{ backgroundColor: "#fafafa", borderRadius: "18px" }}
        >
          <Box margin={1}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>عکس پرسنلی بیمار</TableCell>
                  <TableCell>کپی کارت ملی بیمار</TableCell>
                  <TableCell>توضیحات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Avatar alt="Avatar" src={AvatarLink} />
                  </TableCell>
                  <TableCell>
                    {NationalIdDoc === "" ? (
                      <p>ندارد</p>
                    ) : (
                      <Link
                        target="_blank"
                        href={NationalIdDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>{Comment}</TableCell>

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
