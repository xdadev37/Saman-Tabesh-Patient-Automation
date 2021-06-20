import { FC, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import NameFields from "../../../Pages/AddPatientPage/AddFormDescenders/nameFields";
import { useAppDispatch } from "../../../redux/hook";
import {
  setName,
  setFamilyName,
  setDateOfBirth,
} from "../../../redux/Slicer/AddDataSlice/patientInfoSlice";
import { useForm, FormProvider } from "react-hook-form";
import DateOfBirth from "../../../Pages/AddPatientPage/AddFormDescenders/numericFields/birthdayFields";
import NationalId from "../../../Pages/AddPatientPage/AddFormDescenders/numericFields/nationalIdField";
import TelNumbers from "../../../Pages/AddPatientPage/AddFormDescenders/numericFields/telNumbersFields";

interface IProps {
  requiredField: IRequiredFields;
  setNationalIdDoc: (arg: Blob | string) => void;
  setMedicalInfoStatus: (arg: boolean) => void;
  setTab: (arg: number) => void;
}

const MainInfoUI: FC<IProps> = ({
  requiredField,
  setTab,
  setMedicalInfoStatus,
}) => {
  const dispatch = useAppDispatch();
  const methods = useForm();
  const { handleSubmit, watch } = methods;

  useEffect(() => {
    setMedicalInfoStatus(true);
  }, [setMedicalInfoStatus]);

  const submit = () => {
    dispatch(
      setDateOfBirth(`${watch("year")}/${watch("month")}/${watch("day")}`)
    );
    setMedicalInfoStatus(false);
    setTab(1);
  };

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Grid container justify="space-evenly" id="mainInfoUI">
          {/* ------------------------ Names ------------------------ */}
          <Grid item>
            <NameFields
              id="Name"
              title="نام"
              placeholder="نام بیمار"
              setState={(arg) => dispatch(setName(watch(arg)))}
              defaultState={requiredField.Name}
            />
            <br />
            <NameFields
              id="FamilyName"
              title="نام خانوادگی"
              placeholder="نام خانوادگی بیمار"
              setState={(arg) => dispatch(setFamilyName(watch(arg)))}
              defaultState={requiredField.FamilyName}
            />
            <NationalId />
          </Grid>

          {/* ------------------------ NumericFields ------------------------ */}
          <hr
            style={{
              marginBottom: 40,
              marginTop: 40,
              border: "0.0001px groove #000",
            }}
          />
          <Grid item>
            <DateOfBirth />
            <TelNumbers />
          </Grid>

          <Grid container justify="flex-end">
            <Button
              type="submit"
              endIcon={<ChevronLeft />}
              variant="contained"
              color="primary"
              style={{ width: "10%" }}
            >
              بعدی
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default MainInfoUI;
