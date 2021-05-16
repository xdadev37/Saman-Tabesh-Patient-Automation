import { FC, Fragment, useEffect } from "react";
import MainTable from "./TablesElements/MainTable";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hook";
import axios from "axios";
import {
  setDataGrid,
  selectDataGrids,
} from "../../../../Redux/Slicer/dataGridSlice";

const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const selectData = useAppSelector(selectDataGrids);

  // useEffect(async () => {})

  window.onload = async () => {
    const getData = new Promise((got, failed) => {
      axios
        .get("http://localhost:3002/requiredForm")
        .then((res) => {
          if ((res.status = 200)) {
            for (let i = 0; i < res.data.length; i++) {
              const saveData = dispatch(setDataGrid(res.data[i]));
              got(saveData);
            }
          } else {
            failed(console.log("Failed", res.statusText));
          }
        })
        .catch((error) => {
          failed(console.log(error));
        });
    });

    await getData;
  };

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
        />
      ))}
    </Fragment>
  );
};

export default Pagination;
