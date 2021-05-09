import {
  setName,
  setFamilyName,
  setNationalIdDoc,
  setPathologyDoc,
  setTreatmentDoc,
  setCommitmentDoc,
  setMRIReportDoc,
  setCTReportDoc,
  setPETReportDoc,
  setSonoReportDoc,
  setMamoReportDoc,
  setLabReportDoc,
} from "../../Redux/Slicer/patientInfoSlice";

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
    title: "کارت ملی",
    id: { value: "NationalIdDoc", message: false },
    func: (arg: string) => setNationalIdDoc(arg),
  },
  {
    title: "برگ پاتولوژی",
    id: { value: "PathologyDoc", message: false },
    func: (arg: string) => setPathologyDoc(arg),
  },
  {
    title: "کارت درمان",
    id: { value: "TreatmentDoc", message: false },
    func: (arg: string) => setTreatmentDoc(arg),
  },
  {
    title: "فرم رضایت بیمار",
    id: { value: "CommitmentDoc", message: false },
    func: (arg: string) => setCommitmentDoc(arg),
  },
  {
    title: "گزارش MRI",
    id: { value: "MRIReportDoc", message: false },
    func: (arg: string) => setMRIReportDoc(arg),
  },
  {
    title: "گزارش CT",
    id: { value: "CTReportDoc", message: false },
    func: (arg: string) => setCTReportDoc(arg),
  },
  {
    title: "گزارش PET",
    id: { value: "PETReportDoc", message: false },
    func: (arg: string) => setPETReportDoc(arg),
  },
  {
    title: "گزارش سونو",
    id: { value: "SonoReportDoc", message: false },
    func: (arg: string) => setSonoReportDoc(arg),
  },
  {
    title: "گزارش ماموگرافی",
    id: { value: "MamoReportDoc", message: false },
    func: (arg: string) => setMamoReportDoc(arg),
  },
  {
    title: "گزارشات آزمایشگاهی",
    id: { value: "LabReportDoc", message: false },
    func: (arg: string) => setLabReportDoc(arg),
  },
];
