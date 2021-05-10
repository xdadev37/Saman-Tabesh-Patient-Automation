import { FC, Fragment } from "react";
import { useAppSelector } from "../../../Redux/hook";
import { InputLabel, Input } from "@material-ui/core";
import {
  selectRequiredField,
  selectOptionalField,
} from "../../../Redux/Slicer/patientInfoSlice";

const CheckEntriesForm: FC = () => {
  const requiredFields = useAppSelector(selectRequiredField);
  const optionalFields = useAppSelector(selectOptionalField);

  return <div></div>;
};

export default CheckEntriesForm;
