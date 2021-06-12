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
      "& > * > label": {
        marginBottom: theme.spacing(2),
      },
    },
  })
);

interface IProps {
  requiredField: IRequiredFields;
  watch: (arg: string) => string;
  setAvatar: (arg: string) => void;
  setNationalIdDoc: (arg: Blob | string) => void;
  checkNIdAl: boolean;
  setCheckNIdAl: (arg: boolean) => void;
  setMedicalInfoStatus: (arg: boolean) => void;
  setValue: (arg: number) => void;
  videoSrc: HTMLVideoElement | undefined;
}

const MainInfoUI: FC<IProps> = ({
  requiredField,
  watch,
  checkNIdAl,
  setCheckNIdAl,
  setValue,
  videoSrc,
  setMedicalInfoStatus,
}) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();
  const { handleSubmit } = useFormContext();

  useEffect(() => {
    setMedicalInfoStatus(true);
    if (videoSrc !== undefined) {
      videoSrc!.srcObject = null;

      navigator.mediaDevices.getUserMedia({ video: true }).then((res) => {
        res.getVideoTracks().forEach((tracks) => tracks.stop());
      });
    }
  }, [setMedicalInfoStatus, videoSrc]);

  const submit = () => {
    dispatch(setBirthday(watch("year") + watch("month") + watch("day")));
    setMedicalInfoStatus(false);
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
