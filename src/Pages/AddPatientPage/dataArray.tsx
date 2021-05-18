import { setName, setFamilyName } from "../../Redux/Slicer/patientInfoSlice";

export const dataArrayRequiredName = [
  {
    title: "نام *",
    placeholder: "نام بیمار",
    id: "Name",
    func: (arg: string) => setName(arg),
  },
  {
    title: "نام خانوادگی *",
    placeholder: "نام خانوادگی بیمار",
    id: "FamilyName",
    func: (arg: string) => setFamilyName(arg),
  },
];

export const dataArrayOptional = [
  {
    title: "برگ پاتولوژی",
    id: "PathologyDoc",
  },
  {
    title: "کارت درمان",
    id: "TreatmentDoc",
  },
  {
    title: "فرم رضایت بیمار",
    id: "CommitmentDoc",
  },
  {
    title: "گزارش MRI",
    id: "MRIReportDoc",
  },
  {
    title: "گزارش CT",
    id: "CTReportDoc",
  },
  {
    title: "گزارش PET",
    id: "PETReportDoc",
  },
  {
    title: "گزارش سونو",
    id: "SonoReportDoc",
  },
  {
    title: "گزارش ماموگرافی",
    id: "MamoReportDoc",
  },
  {
    title: "گزارشات آزمایشگاهی",
    id: "LabReportDoc",
  },
];
