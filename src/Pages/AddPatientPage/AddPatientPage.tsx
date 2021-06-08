import { FC, useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  Tabs,
  Tab,
  AppBar,
  FormHelperText,
  Typography,
  Box,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import { setBackdrop } from "../../Redux/Slicer/backdropSlice";
import { selectDarkMode } from "../../Redux/Slicer/darkModeSlice";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChevronRight } from "@material-ui/icons";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../Redux/Slicer/alertMessageSlice";
import AddPatientUI from "../../UI/AddPatientUI/MainInfoUI";
import MedicalInfo from "../../UI/AddPatientUI/MedicalInfoUI";
import ImageValidating from "./AddFormDescenders/imageValidating";
import FilesFields from "../patientActions//newAction/AddFilesForm/FileMapper/FilesFields/filesFields";

const AddPatientPage: FC = () => {
  const requiredField = useAppSelector(selectRequiredField);
  const methods = useForm();
  const { handleSubmit, watch } = methods;
  const [avatar, setAvatar] = useState<Blob | string>("");
  const [nationalIdDoc, setNationalIdDoc] = useState<Blob | string>("");
  const [commitmentDoc, setCommitmentDoc] = useState<Blob | string>("");
  const [hospitalTermDoc, setHospitalTermDoc] = useState<Blob | string>("");
  const [value, setValue] = useState(0);
  const dispatch = useAppDispatch();
  let history = useHistory();
  const [checkNIdAl, setCheckNIdAl] = useState(false);
  const dataGrid = new FormData();
  const darkMode = useAppSelector(selectDarkMode);

  useEffect(() => {
    // if (window.sessionStorage.getItem("Diagnosis") === null) {
    //   window.sessionStorage.setItem();
    // }

    setOpen(false);
  }, []);

  const handleSwitchTabs = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const submit = async () => {
    dataGrid.append("Name", requiredField.Name);
    dataGrid.append("FamilyName", requiredField.FamilyName);
    dataGrid.append("NationalId", requiredField.NationalId);
    dataGrid.append("Avatar", avatar);
    dataGrid.append("NationalIdDoc", nationalIdDoc);
    dataGrid.append("Comment", requiredField.Comment);
    dataGrid.append("Diagnosis", requiredField.Diagnosis);
    dataGrid.append("Insurance", requiredField.Insurance);
    dataGrid.append("CommitmentDoc", commitmentDoc);
    dataGrid.append("HospitalTermDoc", hospitalTermDoc);

    if (checkNIdAl === false) {
      dispatch(setBackdrop());
      const axiosPromise = new Promise((sent, rejected) => {
        axios
          .post(
            "https://my-json-server.typicode.com/xdadev37/jsonDatabase/requiredForm",
            dataGrid
          )
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              dispatch(setAlertText("اطلاعات اولیه بیمار با موفقیت ثبت شد"));
              dispatch(setAlertStatus("success"));
              history.push("/");

              sent(dispatch(setOpen(true)));
            } else {
              dispatch(setAlertText("ثبت اطلاعات انجام نشد"));
              dispatch(setAlertStatus("error"));

              rejected(dispatch(setOpen(true)));
            }
          })
          .catch((error) => {
            console.log(error.request);
            if (error.request.responseText === "") {
              dispatch(setAlertText("ارتباط با سرور برقرار نیست"));
            } else {
              dispatch(setAlertText(error.request.responseText));
            }

            dispatch(setAlertStatus("error"));
            rejected(dispatch(setOpen(true)));
          })
          .finally(() => dispatch(setBackdrop()));
      });

      await axiosPromise;
    }
  };

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
        <AppBar>
          <Tabs
            onChange={handleSwitchTabs}
            value={value}
            indicatorColor="primary"
          >
            <Tab label="اطلاعات هویتی" id="0" aria-controls="0" />
            <Tab label="اطلاعات درمانی" id="1" aria-controls="1" />
            <Tab label="مدارک" id="2" aria-controls="2" />
          </Tabs>
        </AppBar>
        <Box hidden={value !== 0} marginTop={10}>
          <AddPatientUI
            requiredField={requiredField}
            watch={watch}
            setAvatar={setAvatar}
            setNationalIdDoc={setNationalIdDoc}
            checkNIdAl={checkNIdAl}
            setCheckNIdAl={setCheckNIdAl}
          />
        </Box>
        <Box hidden={value !== 1} marginTop={10}>
          <MedicalInfo />
        </Box>
        <Box hidden={value !== 2} marginTop={10}>
          <ImageValidating setAvatar={setAvatar} />
          <hr />
          <FilesFields
            id="NationalIdCard"
            title="کارت ملی :"
            func={setNationalIdDoc}
          />
          <FilesFields
            id="commitmentDoc"
            title="فرم رضایت بیمار :"
            func={setCommitmentDoc}
          />
          <FilesFields
            id="hospitalTermDoc"
            title="فرم پذیرش شرایط بخش :"
            func={setHospitalTermDoc}
          />

          <FormHelperText
            style={{ width: "320px", color: darkMode ? "#fff" : "#000" }}
          >
            <Typography variant="caption" component="span">
              حداکثر حجم فایل مجاز : 300 کیلوبایت
              <br />
              فرمت فایل قابل قبول : PDF
            </Typography>
          </FormHelperText>
        </Box>
      </form>
    </FormProvider>
  );
};

export default AddPatientPage;
