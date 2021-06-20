import { FC, ChangeEvent, useEffect, useState } from "react";
import { Button, Tabs, Tab, AppBar, Box, Paper } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import MainInfoUI from "./Subsets/MainInfoUI";
import MedicalInfo from "./Subsets/MedicalInfoUI";
import MainFilesUI from "./Subsets/MainFilesUI";
import CheckEntriesUI from "./Subsets/checkEntriesUI";
import { useAppSelector, useAppDispatch } from "../../Redux/hook";
import { selectRequiredField } from "../../Redux/Slicer/AddDataSlice/patientInfoSlice";
import { setOpen } from "../../Redux/Slicer/GlobalReduxUIState/alertMessageSlice";
import { useStyle } from "./AddPatientStyle";

interface IProps {
  submit: () => void;
  setNationalIdDoc: (arg: Blob | string) => void;
  setCommitmentDoc: (arg: Blob | string) => void;
  setPolicyDoc: (arg: Blob | string) => void;
  nationalIdDoc: Blob | string;
  commitmentDoc: Blob | string;
  policyDoc: Blob | string;
}

const PatientPageUI: FC<IProps> = ({
  submit,
  setNationalIdDoc,
  setCommitmentDoc,
  setPolicyDoc,
  nationalIdDoc,
  commitmentDoc,
  policyDoc,
}) => {
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState(0);
  const [anotherTabStatus, setAnotherTabStatus] = useState(true);
  const [medicalInfoStatus, setMedicalInfoStatus] = useState(true);
  const [videoSrc, setVideoSrc] = useState<HTMLVideoElement | undefined>();
  const requiredField = useAppSelector(selectRequiredField);
  const classes = useStyle();

  // const dropDownMenu = useAppSelector(selectDropDownMenu);

  useEffect(() => {
    // if (
    //   dropDownMenu.DiagnosisIdMenu.length === 1 ||
    //   dropDownMenu.InsuranceTypeMenu.length === 1
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
      if (tab !== 2) {
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
    dispatch(setOpen(false));
  }, [videoSrc, tab, dispatch]);

  const handleSwitchTabs = (event: ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  let shownTab;
  switch (tab) {
    case 0:
      shownTab = (
        <MainInfoUI
          requiredField={requiredField}
          setNationalIdDoc={setNationalIdDoc}
          setTab={setTab}
          setMedicalInfoStatus={setMedicalInfoStatus}
        />
      );
      break;

    case 1:
      shownTab = (
        <MedicalInfo
          setTab={setTab}
          setAnotherTabStatus={setAnotherTabStatus}
        />
      );
      break;

    case 2:
      shownTab = (
        <MainFilesUI
          setNationalIdDoc={setNationalIdDoc}
          setCommitmentDoc={setCommitmentDoc}
          setPolicyDoc={setPolicyDoc}
          setTab={setTab}
          setVideoSrc={setVideoSrc}
        />
      );
      break;

    case 3:
      shownTab = (
        <CheckEntriesUI
          submit={submit}
          nationalIdDoc={nationalIdDoc}
          commitmentDoc={commitmentDoc}
          policyDoc={policyDoc}
        />
      );
      break;

    default:
      <></>;
  }

  return (
    <AppBar color="default" position="relative">
      <Tabs onChange={handleSwitchTabs} value={tab}>
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
        {tab !== 0 && (
          <Box justifyContent="flex-end" paddingBottom={0.01} paddingTop={3}>
            <Button
              variant="contained"
              startIcon={<ChevronRight />}
              onClick={() => setTab(tab - 1)}
              style={{ float: "left", marginInline: 30 }}
            >
              برگشت
            </Button>
          </Box>
        )}
        {shownTab}
      </Box>
    </AppBar>
  );
};

export default PatientPageUI;
