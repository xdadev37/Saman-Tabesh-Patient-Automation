import { FC, Fragment } from "react";
import MainTable from "./TablesElements/MainTable";
import MoreDetailsTable from "./TablesElements/MoreDetailesTable";

const Pagination: FC = () => {
  return (
    <Fragment>
      <MainTable />
      <MoreDetailsTable />
    </Fragment>
  );
};

export default Pagination;
