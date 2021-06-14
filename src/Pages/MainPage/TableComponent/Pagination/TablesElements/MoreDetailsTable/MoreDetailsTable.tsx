import {
  Table,
  TableRow,
  TableCell,
  Collapse,
  TableHead,
  TableBody,
  Avatar as AvatarMU,
  Link,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ButtonsGroup from "./ButtonsGroup/ButtonsGroup";
import { useAppSelector } from "../../../../../../Redux/hook";
import { selectDarkMode } from "../../../../../../Redux/Slicer/darkModeSlice";

interface IProps {
  open: boolean;
  id: number;
  Name: string;
  FamilyName: string;
  NationalId: string;
  Avatar: string;
  NationalIdDocLink: string;
  Comment: string;
  setCommentAlert: (arg: boolean) => void;
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
  Name,
  FamilyName,
  NationalId,
  Avatar,
  NationalIdDocLink,
  Comment,
  setCommentAlert,
}) => {
  const classes = useRowStyles();
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <TableRow className={classes.root}>
      <TableCell colSpan={8}>
        <Collapse
          in={open}
          mountOnEnter
          unmountOnExit
          style={{
            backgroundColor: darkMode ? "#616161" : "#fafafa",
            borderRadius: "18px",
          }}
        >
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
                  <AvatarMU alt="Avatar" src={Avatar} />
                </TableCell>
                <TableCell>
                  {NationalIdDocLink === "" ? (
                    "ندارد"
                  ) : (
                    <Link
                      color={darkMode ? "textPrimary" : "primary"}
                      target="_blank"
                      href={NationalIdDocLink}
                      rel="noreferrer"
                    >
                      مشاهده پی دی اف
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  {Comment === "" ? (
                    "ندارد"
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => setCommentAlert(true)}
                    >
                      مشاهده
                    </Button>
                  )}
                </TableCell>

                {/* Buttons */}
                <Grid
                  component="td"
                  container
                  justify="center"
                  style={{ paddingInline: 15, paddingBottom: 15 }}
                >
                  <ButtonsGroup
                    id={id}
                    Name={Name}
                    FamilyName={FamilyName}
                    NationalId={NationalId}
                    Avatar={Avatar}
                    NationalIdDocLink={NationalIdDocLink}
                    Comment={Comment}
                  />
                </Grid>
              </TableRow>
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default MoreDetailsTable;
