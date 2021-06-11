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
  "توضیحات",
];

export const birthday = [
  {
    value: "روز",
    id: "day",
    pattern: /\d{2}/,
    maxLength: 2,
    index: { start: 6, end: 8 },
    limiter: { start: 0, end: 31 },
  },
  {
    value: "ماه",
    id: "month",
    pattern: /\d{2}/,
    maxLength: 2,
    index: { start: 4, end: 6 },
    limiter: { start: 0, end: 12 },
  },
  {
    value: "سال",
    id: "year",
    pattern: /\d{4}/,
    maxLength: 4,
    index: { start: 0, end: 4 },
    limiter: { start: 1300, end: new Date().getFullYear() - 621 },
  },
];
