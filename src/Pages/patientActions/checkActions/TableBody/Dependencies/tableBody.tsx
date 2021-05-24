import { FC, useState, Fragment } from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import MoreDetailsTable from "./MoreDetailsTable/MoreDetailsTable";

interface IProps {
  id: number;
  Name: string;
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
}

const TableBody: FC<IProps> = ({
  id,
  Name,
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
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{id}</TableCell>
        <TableCell>{Name}</TableCell>
      </TableRow>
      <MoreDetailsTable
        open={open}
        PathologyDoc={PathologyDoc}
        TreatmentDoc={TreatmentDoc}
        CommitmentDoc={CommitmentDoc}
        MRIReportDoc={MRIReportDoc}
        CTReportDoc={CTReportDoc}
        PETReportDoc={PETReportDoc}
        SonoReportDoc={SonoReportDoc}
        MamoReportDoc={MamoReportDoc}
        LabReportDoc={LabReportDoc}
        Comment={Comment}
      />
    </Fragment>
  );
};

export default TableBody;
