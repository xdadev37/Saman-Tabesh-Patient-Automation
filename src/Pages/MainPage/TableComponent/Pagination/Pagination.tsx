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
          id={data.id}
          Name={data.Name}
          FamilyName={data.FamilyName}
          NationalId={data.NationalId}
          FileNumber={data.FileNumber}
          Avatar={data.Avatar}
          NationalIdDoc={data.NationalIdDoc}
          Comment={data.Comment}
        />
      ))}
    </Fragment>
  );
};

export default Pagination;
