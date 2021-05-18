import { FC, Fragment } from "react";
import TableBody from "./Dependencies/tableBody";
import { useAppSelector } from "../../../../Redux/hook";
import { selectActionName } from "../../../../Redux/Slicer/checkActionSlice";

const TableMapper: FC = () => {
  const selectAction = useAppSelector(selectActionName);

  return (
    <Fragment>
      {selectAction.map((data) => (
        <TableBody
          key={data.id}
          id={data.id}
          Name={data.Name}
        />
      ))}
    </Fragment>
  );
};

export default TableMapper;
