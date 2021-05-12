import { setName, setFamilyName } from "../../Redux/Slicer/patientInfoSlice";

export const dataArrayRequiredName = [
  {
    title: "نام",
    placeholder: "نام بیمار",
    id: "Name",
    func: (arg: string) => setName(arg),
  },
  {
    title: "نام خانوادگی",
    placeholder: "نام خانوادگی بیمار",
    id: "FamilyName",
    func: (arg: string) => setFamilyName(arg),
  },
];

export const dataArrayOptional = [
  {
    title: "برگ پاتولوژی",
    id: { value: "PathologyDoc", message: false },
  },
  {
    title: "کارت درمان",
    id: { value: "TreatmentDoc", message: false },
  },
  {
    title: "فرم رضایت بیمار",
    id: { value: "CommitmentDoc", message: false },
  },
  {
    title: "گزارش MRI",
    id: { value: "MRIReportDoc", message: false },
  },
  {
    title: "گزارش CT",
    id: { value: "CTReportDoc", message: false },
  },
  {
    title: "گزارش PET",
    id: { value: "PETReportDoc", message: false },
  },
  {
    title: "گزارش سونو",
    id: { value: "SonoReportDoc", message: false },
  },
  {
    title: "گزارش ماموگرافی",
    id: { value: "MamoReportDoc", message: false },
  },
  {
    title: "گزارشات آزمایشگاهی",
    id: { value: "LabReportDoc", message: false },
  },
];
