import { Button } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { useAppSelector } from "../../Redux/hook";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import axios from "axios";
import NameFields from "./AddFormDescenders/nameFields";
import NumericFields from "./AddFormDescenders/numericFields";
import RequiredFilesFields from "./AddFormDescenders/requiredFilesFields";
import { FC, useState } from "react";
import { useAppDispatch } from "../../Redux/hook";
import { setPatientId } from "../../Redux/Slicer/idPasserSlice";
import { Link } from "react-router-dom";

const AddPatientPage: FC = () => {
  const requiredField = useAppSelector(selectRequiredField);
  const methods = useForm();
  const { handleSubmit } = methods;
  const [avatar, setAvatar] = useState("");
  const [nationalIdDoc, setNationalIdDoc] = useState("");
  const dispatch = useAppDispatch();

  const submit = async () => {
    const axiosPromise = new Promise((sent, rejected) => {
      axios
        .post("http://localhost:3002/requiredForm", {
          Name: requiredField.Name,
          FamilyName: requiredField.FamilyName,
          NationalId: requiredField.NationalId,
          FileNumber: requiredField.FileNumber,
          Avatar: avatar,
          NationalIdDoc: nationalIdDoc,
        })
        .then((res) => {
          console.log(res.data);
          if ((res.status = 201)) {
            sent(() => {
              console.log("Patient Added", res.statusText);
              dispatch(setPatientId(res.data.id));
              // <Link to="/" />;
            });
          } else {
            rejected(console.log(res.statusText));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    await axiosPromise;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        {/* Names */}
        <NameFields />
        {/* NumericFields */}
        <NumericFields />
        {/* requiredFilesFields */}
        <RequiredFilesFields
          setAvatar={setAvatar}
          setNationalIdDoc={setNationalIdDoc}
        />

        <Button type="submit">ثبت</Button>
      </form>
    </FormProvider>
  );
};

export default AddPatientPage;
