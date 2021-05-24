import { setName, setFamilyName } from "./Redux/Slicer/patientInfoSlice";

export const dataArrayRequiredName = [
  {
    title: "> نام *",
    placeholder: "نام بیمار",
    id: "Name",
    func: (arg: string) => setName(arg),
  },
  {
    title: "> نام خانوادگی *",
    placeholder: "نام خانوادگی بیمار",
    id: "FamilyName",
    func: (arg: string) => setFamilyName(arg),
  },
];

export const dataArrayOptional = [
  "برگ پاتولوژی",
  "کارت درمان",
  "فرم رضایت بیمار",
  "گزارش MRI",
  "گزارش CT",
  "گزارش PET",
  "گزارش سونو",
  "گزارش ماموگرافی",
  "گزارشات آزمایشگاهی",
  "کامنت",
];
