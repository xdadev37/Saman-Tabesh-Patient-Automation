import { FC, Fragment } from "react";
import TableBody from "./Dependencies/tableBody";
import { useAppSelector } from "../../../../Redux/hook";
import { selectFileLinks } from "../../../../Redux/Slicer/checkActionSlice";

const TableMapper: FC = () => {
  const selectAction = useAppSelector(selectFileLinks);

  return (
    <Fragment>
      {selectAction.map((data) => (
        <TableBody
          key={data.id}
          id={data.id}
          Name={data.Name}
          PathologyDoc={data.PathologyDoc}
          TreatmentDoc={data.TreatmentDoc}
          CommitmentDoc={data.CommitmentDoc}
          MRIReportDoc={data.MRIReportDoc}
          CTReportDoc={data.CTReportDoc}
          PETReportDoc={data.PETReportDoc}
          SonoReportDoc={data.SonoReportDoc}
          MamoReportDoc={data.MamoReportDoc}
          LabReportDoc={data.LabReportDoc}
          Comment={data.Comment}
        />
      ))}
    </Fragment>
  );
};

export default TableMapper;
