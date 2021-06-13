import { FC, useState, useEffect, ChangeEvent } from "react";
import { Button, Tabs, Tab, AppBar, Box, Paper } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { useAppSelector } from "../../Redux/hook";
import { ChevronRight } from "@material-ui/icons";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import { setOpen } from "../../Redux/Slicer/alertMessageSlice";
import MainInfoUI from "../../UI/AddPatientUI/Subsets/MainInfoUI";
import MedicalInfo from "../../UI/AddPatientUI/Subsets/MedicalInfoUI";
import MainFilesUI from "../../UI/AddPatientUI/Subsets/MainFilesUI";
import CheckEntries from "./AddFormDescenders/checkEntries";
import { useStyle } from "../../UI/AddPatientUI/AddPatientStyle";
// import {
//   setDropDownMenu,
//   selectDropDownMenu,
// } from "../../Redux/Slicer/dropMenuDataSlice";
// import axios from "axios";

const AddPatientPage: FC = () => {
  const requiredField = useAppSelector(selectRequiredField);
  const methods = useForm();
  const { watch } = methods;
  const [avatar, setAvatar] = useState<string>("");
  const [nationalIdDoc, setNationalIdDoc] = useState<Blob | string>("");
  const [commitmentDoc, setCommitmentDoc] = useState<Blob | string>("");
  const [policyDoc, setPolicyDoc] = useState<Blob | string>("");
  const [value, setValue] = useState(0);
  const [checkNIdAl, setCheckNIdAl] = useState(false);
  const [anotherTabStatus, setAnotherTabStatus] = useState(true);
  const [videoSrc, setVideoSrc] = useState<HTMLVideoElement | undefined>();
  const [medicalInfoStatus, setMedicalInfoStatus] = useState(true);
  const classes = useStyle();
  // const dropDownMenu = useAppSelector(selectDropDownMenu);

  useEffect(() => {
    // if (
    //   dropDownMenu.diagnosisMenu.length === 1 ||
    //   dropDownMenu.insuranceMenu.length === 1
    // ) {
    //   axios
    //     .get("url")
    //     .then((res) => {
    //       console.log(res);
    //       setDropDownMenu(res.data);
    //     })
    //     .catch((error) => {
    //       alert("خطای سرور");
    //       console.log(error);
    //     });
    // }
    const webcamLife = async () => {
      if (value !== 2) {
        if (videoSrc !== undefined) {
          videoSrc!.srcObject = null;

          await navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((res) => {
              res.getVideoTracks().forEach((tracks) => tracks.stop());
            });
        }
      }
    };

    webcamLife();
    setOpen(false);
  }, [videoSrc, value]);

  const handleSwitchTabs = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  let shownTab;
  switch (value) {
    case 0:
      shownTab = (
        <MainInfoUI
          requiredField={requiredField}
          watch={watch}
          setAvatar={setAvatar}
          setNationalIdDoc={setNationalIdDoc}
          checkNIdAl={checkNIdAl}
          setCheckNIdAl={setCheckNIdAl}
          setValue={setValue}
          setMedicalInfoStatus={setMedicalInfoStatus}
        />
      );
      break;

    case 1:
      shownTab = (
        <MedicalInfo
          setValue={setValue}
          setAnotherTabStatus={setAnotherTabStatus}
        />
      );
      break;

    case 2:
      shownTab = (
        <MainFilesUI
          avatar={avatar}
          setAvatar={setAvatar}
          setNationalIdDoc={setNationalIdDoc}
          setCommitmentDoc={setCommitmentDoc}
          setPolicyDoc={setPolicyDoc}
          setValue={setValue}
          setVideoSrc={setVideoSrc}
        />
      );
      break;

    case 3:
      shownTab = (
        <CheckEntries
          avatar={avatar}
          nationalIdDoc={nationalIdDoc}
          commitmentDoc={commitmentDoc}
          policyDoc={policyDoc}
          checkNIdAl={checkNIdAl}
        />
      );
      break;

    default:
      <></>;
  }

  return (
    <FormProvider {...methods}>
      <AppBar color="default" position="relative">
        <Tabs onChange={handleSwitchTabs} value={value}>
          <Tab label="اطلاعات هویتی" aria-controls="0" />
          <Tab
            label="اطلاعات درمانی"
            aria-controls="1"
            disabled={medicalInfoStatus}
          />
          <Tab label="مدارک" aria-controls="2" disabled={anotherTabStatus} />
          <Tab
            label="اطلاعات کلی"
            aria-controls="3"
            disabled={anotherTabStatus}
          />
        </Tabs>
        <Box className={classes.root} component={Paper}>
          {value !== 0 && (
            <Box justifyContent="flex-end" paddingBottom={0.01} paddingTop={3}>
              <Button
                variant="contained"
                startIcon={<ChevronRight />}
                onClick={() => setValue(value - 1)}
                style={{ float: "left", marginInline: 30 }}
              >
                برگشت
              </Button>
            </Box>
          )}
          {shownTab}
        </Box>
      </AppBar>
    </FormProvider>
  );
};

export default AddPatientPage;
