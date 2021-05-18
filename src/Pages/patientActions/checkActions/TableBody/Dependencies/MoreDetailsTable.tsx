import {
  Table,
  TableRow,
  TableCell,
  Collapse,
  Box,
  TableHead,
  TableBody,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppSelector } from "../../../../../Redux/hook";
import { dataArrayOptional } from "../../../../AddPatientPage/dataArray";
import { selectFileLinks } from "../../../../../Redux/Slicer/checkActionSlice";

interface IProps {
  open: boolean;
  id: number;
}

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

const MoreDetailsTable: React.FC<IProps> = ({ open, id }) => {
  const classes = useRowStyles();
  const selectFile = useAppSelector(selectFileLinks);

  return (
    <TableRow className={classes.root}>
      <TableCell colSpan={6}>
        <Collapse in={open} mountOnEnter unmountOnExit>
          <Box margin={1}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {dataArrayOptional.map((data) => (
                    <TableCell>{data.title}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {selectFile.map((data) => (
                    <TableCell key={id}>
                      <Link
                        target="_blank"
                        href={data.PathologyDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                      <Link
                        target="_blank"
                        href={data.TreatmentDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                      <Link
                        target="_blank"
                        href={data.CommitmentDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                      <Link
                        target="_blank"
                        href={data.MRIReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                      <Link
                        target="_blank"
                        href={data.CTReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                      <Link
                        target="_blank"
                        href={data.PETReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                      <Link
                        target="_blank"
                        href={data.SonoReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                      <Link
                        target="_blank"
                        href={data.MamoReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                      <Link
                        target="_blank"
                        href={data.LabReportDoc}
                        rel="noreferrer"
                      >
                        مشاهده پی دی اف
                      </Link>
                    </TableCell>
                  ))}
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
