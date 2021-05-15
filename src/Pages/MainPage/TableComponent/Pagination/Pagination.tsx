import { FC, Fragment } from "react";
import MainTable from "./TablesElements/MainTable";
import MoreDetailsTable from "./TablesElements/MoreDetailsTable";
import { useAppDispatch } from "../../../../Redux/hook";
import axios from "axios";
import {
  setPatientId,
  setName,
  setFamilyName,
  setNationalId,
  setFileNumber,
  setAvatar,
  setNationalIdDoc,
} from "../../../../Redux/Slicer/dataGridSlice";

const Pagination: FC = () => {
  const dispatch = useAppDispatch();

  window.onload = async () => {
    const getData = new Promise((got, failed) => {
      axios
        .get("http://localhost:3002/requiredForm")
        .then((res) => {
          console.log(res);
          if ((res.status = 200 | 304)) {
            got(() => {
              for (let i = 0; i < 10000; i++) {
                dispatch(setPatientId(res.data[i].id));
                dispatch(setName(res.data[i].Name));
                dispatch(setFamilyName(res.data[i].FamilyName));
                dispatch(setNationalId(res.data[i].NationalId));
                dispatch(setFileNumber(res.data[i].FileNumber));
                dispatch(setAvatar(res.data[i].Avatar));
                dispatch(setNationalIdDoc(res.data[i].NationalIdDoc));
              }
            });
          } else {
            failed(console.log("Failed", res.statusText));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    await getData;
  };

  return (
    <Fragment>
      <MainTable />
      <MoreDetailsTable />
    </Fragment>
  );
};

export default Pagination;
