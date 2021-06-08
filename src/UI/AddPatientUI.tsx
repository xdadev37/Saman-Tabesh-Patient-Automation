import { Grid, Button } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Check } from "@material-ui/icons";
import NameFields from "../Pages/AddPatientPage/AddFormDescenders/nameFields";
import NumericFields from "../Pages/AddPatientPage/AddFormDescenders/numericFields";
import RequiredFilesFields from "../Pages/AddPatientPage/AddFormDescenders/FileInput/requiredFilesFields";
import { useAppDispatch } from "../Redux/hook";
import { setName, setFamilyName } from "../Redux/Slicer/patientInfoSlice";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      paddingTop: theme.spacing(5),
      width: "70%",
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
}

const AddPatientUI: React.FC<IProps> = ({
  requiredField,
  watch,
  setAvatar,
  setNationalIdDoc,
  checkNIdAl,
  setCheckNIdAl,
}) => {
  const classes = useStyle();
  const dispatch = useAppDispatch();

  return (
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
      </Grid>

      {/* ------------------------ NumericFields ------------------------ */}
      <hr />
      <Grid item>
        <NumericFields checkNIdAl={checkNIdAl} setCheckNIdAl={setCheckNIdAl} />
      </Grid>

      {/* ------------------------ requiredFilesFields ------------------------ */}
      <Grid item>
        <hr style={{ marginTop: 10, marginBottom: 10 }} />
        <RequiredFilesFields
          setAvatar={setAvatar}
          setNationalIdDoc={setNationalIdDoc}
        />
      </Grid>

      <Grid container justify="flex-end">
        <Button
          type="submit"
          size="small"
          startIcon={<Check fontSize="small" />}
          variant="contained"
          color="primary"
          style={{ width: "30%" }}
        >
          ثبت
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddPatientUI;
