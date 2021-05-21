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
    func: (arg: object) => setPathologyDoc(arg),
  },
  {
    title: "کارت درمان",
    id: "TreatmentDoc",
    func: (arg: object) => setTreatmentDoc(arg),
  },
  {
    title: "فرم رضایت بیمار",
    id: "CommitmentDoc",
    func: (arg: object) => setCommitmentDoc(arg),
  },
  {
    title: "گزارش MRI",
    id: "MRIReportDoc",
    func: (arg: object) => setMRIReportDoc(arg),
  },
  {
    title: "گزارش CT",
    id: "CTReportDoc",
    func: (arg: object) => setCTReportDoc(arg),
  },
  {
    title: "گزارش PET",
    id: "PETReportDoc",
    func: (arg: object) => setPETReportDoc(arg),
  },
  {
    title: "گزارش سونو",
    id: "SonoReportDoc",
    func: (arg: object) => setSonoReportDoc(arg),
  },
  {
    title: "گزارش ماموگرافی",
    id: "MamoReportDoc",
    func: (arg: object) => setMamoReportDoc(arg),
  },
  {
    title: "گزارشات آزمایشگاهی",
    id: "LabReportDoc",
    func: (arg: object) => setLabReportDoc(arg),
  },
];
