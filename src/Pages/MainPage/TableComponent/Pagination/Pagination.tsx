import { FC, Fragment } from "react";
import MainTable from "./TablesElements/MainTable";
import MoreDetailsTable from "./TablesElements/MoreDetailesTable";
import { useState } from "react";

const Pagination: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <MainTable open={open} setOpen={setOpen} />
      <MoreDetailsTable open={open} setOpen={setOpen} />
    </Fragment>
  );
};

export default Pagination;
