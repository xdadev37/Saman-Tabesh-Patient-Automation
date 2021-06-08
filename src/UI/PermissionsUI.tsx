import NameFields from "../Pages/AddPatientPage/AddFormDescenders/nameFields";
import ImageValidating from "../Pages/AddPatientPage/AddFormDescenders/FileInput/filesValidating/imageValidating";
import { useForm, FormProvider } from "react-hook-form";
import { Button, InputLabel, Input, Typography } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import UserPassUI from "./UserPassUI";
import { useAppDispatch, useAppSelector } from "../Redux/hook";
import { setDocName, setDocFamilyName } from "../Redux/Slicer/permissionSlice";
import { selectDarkMode } from "../Redux/Slicer/darkModeSlice";
import { selectPass } from "../Redux/Slicer/userPassSlice";

interface IProps {
  submit: () => void;
  setAvatar: (arg: Blob) => void;
}

const PermissionsUI: React.FC<IProps> = ({ submit, setAvatar }) => {
  const methods = useForm();
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = methods;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(selectDarkMode);
  const pass = useAppSelector(selectPass);

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Button
          variant="outlined"
          startIcon={<ChevronRight />}
          onClick={() => history.push("/")}
          style={{ float: "left", marginInline: 30 }}
        >
          برگشت
        </Button>

        <NameFields
          id="Name"
          title="نام"
          placeholder="نام بیمار"
          setState={(arg) => dispatch(setDocName(watch(arg)))}
          defaultState=""
        />
        <NameFields
          id="FamilyName"
          title="نام خانوادگی"
          placeholder="نام خانوادگی بیمار"
          setState={(arg) => dispatch(setDocFamilyName(watch(arg)))}
          defaultState=""
        />

        <ImageValidating setAvatar={setAvatar} />

        <UserPassUI />

        <InputLabel
          htmlFor="rePassword"
          style={{
            marginTop: 30,
            marginBottom: 10,
            color: darkMode ? "#fff" : "#000",
          }}
        >
          گذرواژه :
        </InputLabel>
        <Input
          fullWidth
          id="rePassword"
          type="password"
          placeholder="گذرواژه خود را وارد کنید"
          {...register("rePassword", {
            required: "پر کردن این فیلد الزامی است!",
            validate: (value) =>
              value === pass || "گذرواژه های وارد شده یکسان نیستند",
            // pattern: {
            //   value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
            //   message: "گذرواژه وارد شده اشتباه است",
            // },
          })}
        />
        {errors.rePassword && (
          <Typography color="secondary">{errors.rePassword.message}</Typography>
        )}
      </form>
    </FormProvider>
  );
};

export default PermissionsUI;
