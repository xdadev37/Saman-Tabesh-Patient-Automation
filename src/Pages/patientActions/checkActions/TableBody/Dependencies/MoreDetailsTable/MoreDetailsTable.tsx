import {
  Table,
  TableRow,
  TableCell,
  Collapse,
  Box,
  TableHead,
  TableBody,
  Link,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { dataArrayOptional } from "../../../../../../GloballyComponents/dataArray";
import { useAppSelector } from "../../../../../../redux/hook";
import { selectDarkMode } from "../../../../../../redux/Slicer/GlobalReduxUIState/darkModeSlice";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

interface IProps {
  open: boolean;
  PathologyDoc: string;
  TreatmentDoc: string;
  CommitmentDoc: string;
  MRIReportDoc: string;
  CTReportDoc: string;
  PETReportDoc: string;
  SonoReportDoc: string;
  MamoReportDoc: string;
  LabReportDoc: string;
  Comment: string;
  setCommentAlert: (arg: boolean) => void;
}

const MoreDetailsTable: React.FC<IProps> = ({
  open,
  PathologyDoc,
  TreatmentDoc,
  CommitmentDoc,
  MRIReportDoc,
  CTReportDoc,
  PETReportDoc,
  SonoReportDoc,
  MamoReportDoc,
  LabReportDoc,
  Comment,
  setCommentAlert,
}) => {
  const classes = useRowStyles();
  const none = <Typography>ندارد</Typography>;
  const darkMode = useAppSelector(selectDarkMode);

  return (
    <TableRow className={classes.root}>
      <TableCell colSpan={6}>
        <Collapse
          style={{
            backgroundColor: darkMode ? "#616161" : "#fafafa",
            borderRadius: "18px",
          }}
          in={open}
          mountOnEnter
          unmountOnExit
        >
          <Box margin={1}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {dataArrayOptional.map((data) => (
                    <TableCell key={data}>{data}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {PathologyDoc === "" ? (
                      none
                    ) : (
                      <Link
                        target="_blank"
                        href={PathologyDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {TreatmentDoc === "" ? (
                      none
                    ) : (
                      <Link
                        target="_blank"
                        href={TreatmentDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {CommitmentDoc === "" ? (
                      none
                    ) : (
                      <Link
                        target="_blank"
                        href={CommitmentDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {MRIReportDoc === "" ? (
                      none
                    ) : (
                      <Link
                        target="_blank"
                        href={MRIReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {CTReportDoc === "" ? (
                      none
                    ) : (
                      <Link target="_blank" href={CTReportDoc} rel="noreferrer">
                        مشاهده پی دی اف
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {PETReportDoc === "" ? (
                      none
                    ) : (
                      <Link
                        target="_blank"
                        href={PETReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {SonoReportDoc === "" ? (
                      none
                    ) : (
                      <Link
                        target="_blank"
                        href={SonoReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {MamoReportDoc === "" ? (
                      none
                    ) : (
                      <Link
                        target="_blank"
                        href={MamoReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {LabReportDoc === "" ? (
                      none
                    ) : (
                      <Link
                        target="_blank"
                        href={LabReportDoc}
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
