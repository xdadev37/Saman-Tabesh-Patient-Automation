import { FC, ChangeEvent, useEffect } from "react";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  selectRequiredField,
  setComment,
  setDiagnosisId,
  setInsuranceType,
} from "../../../redux/Slicer/AddDataSlice/patientInfoSlice";
import { selectDropDownMenu } from "../../../redux/Slicer/CachedDataSlice/dropMenuDataSlice";
import { useForm } from "react-hook-form";
import CommentField from "../../CommentFieldUI";

interface IProps {
  setTab: (arg: number) => void;
  setAnotherTabStatus: (arg: boolean) => void;
}

const MedicalInfoUI: FC<IProps> = ({ setTab, setAnotherTabStatus }) => {
  const dispatch = useAppDispatch();
  const tempData = useAppSelector(selectRequiredField);
  const dropDownMenu = useAppSelector(selectDropDownMenu);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setAnotherTabStatus(true);
  }, [setAnotherTabStatus]);

  const selectors = [
    {
      id: "DiagnosisId",
      text: "تشخیص : ",
      value: tempData.DiagnosisId,
      func: (arg: string) => setDiagnosisId(arg),
      menuData: dropDownMenu.DiagnosisIdMenu,
    },
    {
      id: "InsuranceType",
      text: "بیمه : ",
      value: tempData.InsuranceType,
      func: (arg: string) => setInsuranceType(arg),
      menuData: dropDownMenu.InsuranceTypeMenu,
    },
  ];

  const submit = () => {
    setAnotherTabStatus(false);
    setTab(2);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      <Grid container>
        <Grid container justify="space-around">
          {selectors.map((input) => (
            <Grid item>
              <InputLabel
                key={input.id}
                htmlFor={input.id}
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                {input.text}
                <Select
                  id={input.id}
                  style={{ width: 200, height: 40 }}
                  variant="outlined"
                  value={input.value}
                  {...register(input.id, {
                    required: `انتخاب نوع ${
                      input.text.split(":")[0]
                    } الزامی است`,
                  })}
                  onChange={(event: ChangeEvent<{ value: unknown }>) => {
                    dispatch(input.func(String(event.target.value)));
                  }}
                >
                  {input.menuData.map((menu) => (
                    <MenuItem key={menu.id} value={menu.id}>
                      {menu.value}
                    </MenuItem>
                  ))}
                </Select>
              </InputLabel>
              {errors[input.id] && (
                <Typography variant="subtitle2" color="error">
                  {errors[input.id].message}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>

        {/* ------------------------ Comment ------------------------ */}
        <Grid item sm={12} md={12} lg={12}>
          <hr
            style={{
              marginBottom: 20,
              marginTop: 20,
              border: "0.0001px groove #000",
            }}
          />

          <CommentField
            defaultValue={tempData.Comment}
            func={() => dispatch(setComment)}
          />
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

export default MedicalInfoUI;
