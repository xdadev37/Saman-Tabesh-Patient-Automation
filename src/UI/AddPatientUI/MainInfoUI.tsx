import { FC, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ChevronLeft } from "@material-ui/icons";
import NameFields from "../../Pages/AddPatientPage/AddFormDescenders/nameFields";
import { useAppDispatch } from "../../Redux/hook";
import {
  setName,
  setFamilyName,
  setBirthday,
} from "../../Redux/Slicer/patientInfoSlice";
import { useFormContext } from "react-hook-form";
import Birthday from "../../Pages/AddPatientPage/AddFormDescenders/numericFields/birthdayFields";
import NationalId from "./../../Pages/AddPatientPage/AddFormDescenders/numericFields/nationalIdField";
import TelNumbers from "./../../Pages/AddPatientPage/AddFormDescenders/numericFields/telNumbersFields";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      paddingTop: theme.spacing(5),
      "& > label": {
        marginTop: theme.spacing(3),
      },
    },
  })
);

interface IProps {
  requiredField: IRequiredFields;
  watch: (arg: string) => string;
  setAvatar: (arg: Blob | string) => void;
  setNationalIdDoc: (arg: Blob | string) => void;
  checkNIdAl: boolean;
  setCheckNIdAl: (arg: boolean) => void;
  setMainInfoStatus: (arg: boolean) => void;
  setValue: (arg: number) => void;
}

const MainInfoUI: FC<IProps> = ({
  requiredField,
  watch,
  checkNIdAl,
  setCheckNIdAl,
  setMainInfoStatus,
  setValue,
}) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useFormContext();

  useEffect(() => {
    setMainInfoStatus(true);
  }, [setMainInfoStatus]);

  const submit = () => {
    dispatch(setBirthday(watch("year") + watch("month") + watch("day")));
    setMainInfoStatus(false);
    setValue(1);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      <Grid container justify="space-between" className={classes.form}>
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
          <NationalId checkNIdAl={checkNIdAl} setCheckNIdAl={setCheckNIdAl} />
        </Grid>

        {/* ------------------------ NumericFields ------------------------ */}
        <hr />
        <Grid item>
          <Birthday />
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
  );
};

export default MainInfoUI;
