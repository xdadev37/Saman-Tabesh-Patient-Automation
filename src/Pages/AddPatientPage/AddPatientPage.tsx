import { FC, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Button,
  Grid,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import axios from "axios";
import NameFields from "./AddFormDescenders/nameFields";
import NumericFields from "./AddFormDescenders/numericFields";
import RequiredFilesFields from "./AddFormDescenders/requiredFilesFields";
import { setPatientId } from "../../Redux/Slicer/idPasserSlice";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    marginTop: {
      marginTop: theme.spacing(10),
    },
  })
);

const AddPatientPage: FC = () => {
  const classes = useStyle();
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
            const patchFilesLink = () => {
              console.log("Patient Added", res.statusText);
              dispatch(setPatientId(res.data.id));
              window.location.reload();
              // <Link to="/" />;
            };
            sent(patchFilesLink);
          } else {
            rejected(console.log(res.statusText));
          }
        })
        .catch((error) => {
          rejected(console.log(error));
        });
    });

    await axiosPromise;
  };

  return (
    <Grid
      container
      className={classes.marginTop}
      justify="center"
      alignContent="center"
    >
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
    </Grid>
  );
};

export default AddPatientPage;
