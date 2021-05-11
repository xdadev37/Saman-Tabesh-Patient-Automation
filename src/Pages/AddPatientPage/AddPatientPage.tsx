import { FC, useState, Fragment } from "react";
import {
  Button,
  Typography,
  Step,
  Stepper,
  StepLabel,
} from "@material-ui/core";
import { useAppSelector } from "../../Redux/hook";
import {
  selectRequiredField,
  selectOptionalField,
} from "../../Redux/Slicer/patientInfoSlice";
import RequiredFields from "./FormFields/RequiredFields/requiredFields";
import OptionalFields from "./FormFields/OptionalFields/optionalFields";
import axios from "axios";

const getSteps = () => [
  "اطلاعات اولیه بیمار",
  "آپلود مدارک بیمار",
  "مرور اطلاعات بیمار",
];

const AddPatientPage: FC = () => {
  const requiredField = useAppSelector(selectRequiredField);
  const optionalField = useAppSelector(selectOptionalField);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = getSteps();

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <RequiredFields handleNext={handleNext} />;
      case 1:
        return <OptionalFields />;
      case 2:
        return <p>sss</p>;
      default:
        return <RequiredFields handleNext={handleNext} />;
    }
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("پر کردن فیلد ها الزامی است!");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const submit = (data: any) => {
    return data;
    // axios
    //   .post("http://localhost:3000/addPatient", {
    //     Name: requiredField.Name,
    //     FamilyName: requiredField.FamilyName,
    //     NationalId: requiredField.NationalId,
    //     FileNumber: requiredField.FileNumber,
    //     Avatar: requiredField.Avatar,
    //     NationalIdDoc: optionalField.NationalIdDoc,
    //     PathologyDoc: optionalField.PathologyDoc,
    //     TreatmentDoc: optionalField.TreatmentDoc,
    //     CommitmentDoc: optionalField.CommitmentDoc,
    //     MRIReportDoc: optionalField.MRIReportDoc,
    //     CTReportDoc: optionalField.CTReportDoc,
    //     PETReportDoc: optionalField.PETReportDoc,
    //     SonoReportDoc: optionalField.SonoReportDoc,
    //     MamoReportDoc: optionalField.MamoReportDoc,
    //     LabReportDoc: optionalField.LabReportDoc,
    //     Comment: optionalField.Comment,
    //   })
    //   .then((res) => {});
  };

  return (
    <Fragment>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <Fragment>
          <Typography>اطلاعات با موفقیت ثبت شد!</Typography>
          <Button onClick={handleReset}>ریست</Button>
        </Fragment>
      ) : (
        <Fragment>
          <Typography>{getStepContent(activeStep)}</Typography>
          {isStepOptional(activeStep) && (
            <Button onClick={handleSkip} variant="contained" color="primary">
              رد کردن
            </Button>
          )}
          {/* <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "ثبت" : "بعدی"}
          </Button> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default AddPatientPage;
