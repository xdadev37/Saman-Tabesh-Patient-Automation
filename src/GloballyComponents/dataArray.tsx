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

export const DateOfBirth = [
  {
    value: "روز",
    id: "day",
    pattern: /\d{2}/,
    maxLength: 2,
    index: 2,
    limiter: { start: 0, end: 31 },
  },
  {
    value: "ماه",
    id: "month",
    pattern: /\d{2}/,
    maxLength: 2,
    index: 1,
    limiter: { start: 0, end: 12 },
  },
  {
    value: "سال",
    id: "year",
    pattern: /\d{4}/,
    maxLength: 4,
    index: 0,
    limiter: {
      start: 1300,
      end: new Date().toLocaleDateString("fa-IR", {
        year: "numeric",
        numberingSystem: "latn",
      }),
    },
  },
];
