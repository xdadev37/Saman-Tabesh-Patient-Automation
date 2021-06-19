import { ChangeEvent } from "react";

export const numericValidation = (
  event: ChangeEvent<HTMLInputElement>,
  id: string,
  text: string,
  func: (arg1: string, arg2: string) => void
) => {
  const inputValue = event.target.value;

  if (inputValue === " ") {
    event.target.value = "";
  } else {
    if (inputValue !== "") {
      if (!inputValue.charAt(inputValue.length - 1).match(/\d/)) {
        event.target.value = inputValue.slice(0, inputValue.length - 1);
        alert(`${text} فقط شامل اعداد است`);
      } else {
        func(id, inputValue);
      }
    } else {
      func(id, "");
    }
  }
};
