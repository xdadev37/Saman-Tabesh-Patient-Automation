import { FC, ChangeEvent } from "react";
import {
  Grid,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectPhysicians } from "../../../Redux/Slicer/physiciansSlice";
import { setActionForm } from "../../../Redux/Slicer/actionStatusSlice";
import { setPatientFileId } from "../../../Redux/Slicer/idPasserSlice";
import { setBackdrop } from "../../../Redux/Slicer/backdropSlice";
import {
  selectFilePage,
  setFileNumber,
  setPhysicianId,
  setComment,
} from "../../../Redux/Slicer/filePageSlice";
import { useForm } from "react-hook-form";
import { numericValidation } from "../../AddPatientPage/AddFormDescenders/numericFields/numericValidation";
import CommentField from "../../../UI/CommentFieldUI";
import axios from "axios";

const Page2: FC = () => {
  const dispatch = useAppDispatch();
  const physiciansData = useAppSelector(selectPhysicians);
  const defaultState = useAppSelector(selectFilePage);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dataGrid = new FormData();

  const submit = () => {
    dataGrid.append("PatientId", defaultState.patientId);
    dataGrid.append("Modality", defaultState.Modality);
    dataGrid.append("FileNumber", defaultState.fileNumber);
    dataGrid.append("PhysicianId", defaultState.PhysicianId);
    dataGrid.append("Comment", defaultState.Comment);

    dispatch(setBackdrop(true));
    axios
      .post("url", { dataGrid })
      .then((res) => {
        console.log(res);

        if (res.status === 201) {
          dispatch(setPatientFileId(res.data.PatientFileId));
          dispatch(setActionForm("getActionName"));
        } else {
          console.log(res);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => dispatch(setBackdrop(false)));
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      <Grid container>
        <Grid container justify="space-evenly">
          <InputLabel htmlFor="FileNumber">شماره پرونده : </InputLabel>
          <TextField
            defaultValue={defaultState.fileNumber}
            id="FileNumber"
            inputProps={{ maxLength: 6 }}
            placeholder="ادامه شماره"
            {...register("FileNumber", {
              required: "پر کردن این فیلد الزامی است!",
              minLength: {
                value: 6,
                message: "مقدار شماره پرونده حداقل باید 6 عدد باشد!",
              },
              pattern: {
                value: /\d{10}/,
                message: "کد ملی فقط شامل اعداد است",
              },
            })}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              numericValidation(event, "FileNumber", "شماره پرونده", setValue);
              dispatch(setFileNumber(watch("FileNumber")));
            }}
          />
          <Typography variant="h5">
            <sub>_R_000</sub>
          </Typography>

          {errors.FileNumber && (
            <Typography color="error" variant="subtitle2">
              {errors.FileNumber.message}
            </Typography>
          )}
          <InputLabel htmlFor="physicianName">نام پزشک</InputLabel>
          <Select
            variant="outlined"
            value={defaultState.PhysicianId}
            style={{ width: 200, height: 40 }}
            id="physicianName"
            {...register("Physicians", {
              required: "انتخاب نام پزشک معالج الزامی است",
            })}
            onChange={(event: ChangeEvent<{ value: unknown }>) => {
              dispatch(setPhysicianId(String(event.target.value)));
            }}
          >
            {physiciansData.map((data) => (
              <MenuItem value={data.id}>{data.value}</MenuItem>
            ))}
          </Select>
          {errors.Physicians && (
            <Typography color="error" variant="subtitle2">
              {errors.Physicians.message}
            </Typography>
          )}
        </Grid>
        <Grid item>
          <CommentField
            defaultValue={defaultState.Comment}
            func={dispatch(setComment)}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Button type="submit">ثبت پرونده بیمار</Button>
      </Grid>
    </form>
  );
};

export default Page2;
