import { FC, Fragment } from "react";
import MainTable from "./TablesElements/MainTable";
import { useAppSelector } from "../../../../Redux/hook";
import { selectDataGrids } from "../../../../Redux/Slicer/dataGridSlice";

const Pagination: FC = () => {
  const selectData = useAppSelector(selectDataGrids);

  return (
    <Fragment>
      {selectData.map((data) => (
        <MainTable
          key={data.id}
          row={selectData.indexOf(data) + 1}
          id={data.id}
          Name={data.Name}
          FamilyName={data.FamilyName}
          NationalId={data.NationalId}
          Avatar={data.Avatar}
          DiagnosisId={data.DiagnosisId}
          Comment={data.Comment}
        />
      ))}
    </Fragment>
  );
};

export default Pagination;
