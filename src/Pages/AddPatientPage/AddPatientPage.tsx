import { FC, useState, useEffect, ChangeEvent } from "react";
import { Button, Tabs, Tab, AppBar, Box } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { useAppSelector } from "../../Redux/hook";
import { ChevronRight } from "@material-ui/icons";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import { setOpen } from "../../Redux/Slicer/alertMessageSlice";
import MainInfoUI from "../../UI/AddPatientUI/MainInfoUI";
import MedicalInfo from "../../UI/AddPatientUI/MedicalInfoUI";
import MainFilesUI from "../../UI/AddPatientUI/MainFilesUI";
import CheckEntries from "../../UI/AddPatientUI/checkEntries";

const AddPatientPage: FC = () => {
  const requiredField = useAppSelector(selectRequiredField);
  const methods = useForm();
  const { watch } = methods;
  const [avatar, setAvatar] = useState<Blob | string>("");
  const [nationalIdDoc, setNationalIdDoc] = useState<Blob | string>("");
  const [commitmentDoc, setCommitmentDoc] = useState<Blob | string>("");
  const [policyDoc, setPolicyDoc] = useState<Blob | string>("");
  const [value, setValue] = useState(2);
  const [checkNIdAl, setCheckNIdAl] = useState(false);
  const [mainInfoStatus, setMainInfoStatus] = useState(true);

  useEffect(() => {
    if (
      window.sessionStorage.getItem("Diagnosis") === null ||
      window.sessionStorage.getItem("Insurance") === null
    ) {
      window.sessionStorage.setItem("Diagnosis", "");
      window.sessionStorage.setItem("Insurance", "");
    }

    setOpen(false);
  }, []);

  const handleSwitchTabs = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  let shownTab = <></>;
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
          setMainInfoStatus={setMainInfoStatus}
          setValue={setValue}
        />
      );
      break;

    case 1:
      shownTab = <MedicalInfo setValue={setValue} />;
      break;

    case 2:
      shownTab = (
        <MainFilesUI
          setAvatar={setAvatar}
          setNationalIdDoc={setNationalIdDoc}
          setCommitmentDoc={setCommitmentDoc}
          setPolicyDoc={setPolicyDoc}
          setValue={setValue}
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
      <Button
        variant="outlined"
        startIcon={<ChevronRight />}
        onClick={() => setValue(value - 1)}
        style={{ float: "left", marginInline: 30 }}
      >
        برگشت
      </Button>
      <AppBar color="default">
        <Tabs onChange={handleSwitchTabs} value={value}>
          <Tab label="اطلاعات هویتی" aria-controls="0" />
          <Tab
            label="اطلاعات درمانی"
            aria-controls="1"
            disabled={mainInfoStatus}
          />
          <Tab label="مدارک" aria-controls="2" disabled={mainInfoStatus} />
          <Tab
            label="اطلاعات کلی"
            aria-controls="3"
            disabled={mainInfoStatus}
          />
        </Tabs>
      </AppBar>
      <Box marginTop={10}>{shownTab}</Box>
    </FormProvider>
  );
};

export default AddPatientPage;
