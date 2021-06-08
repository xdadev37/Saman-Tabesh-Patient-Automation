import { FC, Fragment, ChangeEvent } from "react";
import { InputLabel, Input, Typography, Box } from "@material-ui/core";
import { useFormContext } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  selectRequiredField,
  setNationalId,
  setMobileNo,
  setEmergencyMobileNo,
  setBirthday,
} from "../../../Redux/Slicer/patientInfoSlice";
import { selectDarkMode } from "../../../Redux/Slicer/darkModeSlice";

interface IProps {
  checkNIdAl: boolean;
  setCheckNIdAl: (arg: boolean) => void;
}

const NumericFields: FC<IProps> = ({ checkNIdAl, setCheckNIdAl }) => {
  const dispatch = useAppDispatch();
  const defaultState = useAppSelector(selectRequiredField);
  const darkMode = useAppSelector(selectDarkMode);

  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  const numericValidation = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    text: string
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
          setValue(id, inputValue);
        }
      } else {
        setValue(id, "");
      }
    }
  };

  const checkNationalIdAl = (value: string) => {
    if (value !== undefined) {
      if (value.length === 10) {
        if (
          value === "0000000000" ||
          value === "1111111111" ||
          value === "2222222222" ||
          value === "3333333333" ||
          value === "4444444444" ||
          value === "5555555555" ||
          value === "6666666666" ||
          value === "7777777777" ||
          value === "8888888888" ||
          value === "9999999999"
        ) {
          setCheckNIdAl(true);
        } else {
          const a = parseInt(value.charAt(9));
          const b =
            parseInt(value.charAt(0)) * 10 +
            parseInt(value.charAt(1)) * 9 +
            parseInt(value.charAt(2)) * 8 +
            parseInt(value.charAt(3)) * 7 +
            parseInt(value.charAt(4)) * 6 +
            parseInt(value.charAt(5)) * 5 +
            parseInt(value.charAt(6)) * 4 +
            parseInt(value.charAt(7)) * 3 +
            parseInt(value.charAt(8)) * 2;
          const c = b % 11;
          if ((c < 2 && a === c) || (c >= 2 && 11 - c === a)) {
            setCheckNIdAl(false);
          } else {
            setCheckNIdAl(true);
          }
        }
      } else {
        setCheckNIdAl(false);
      }
    }
  };

  const telNumbers = [
    {
      value: "",
      id: "mobileNo",
      defaultState: defaultState.mobileNo,
      dispatcher: () => dispatch(setMobileNo(watch("mobileNo"))),
    },
    {
      value: " اضطراری",
      id: "emergencyMobileNo",
      defaultState: defaultState.emergencyMobileNo,
      dispatcher: () =>
        dispatch(setEmergencyMobileNo(watch("emergencyMobileNo"))),
    },
  ];

  return (
    <Fragment>
      {/* ------------------------ NationalId ------------------------ */}
      <InputLabel
        htmlFor="NationalId"
        style={{ color: darkMode ? "#fff" : "#2962ff", fontSize: "14px" }}
      >
        کد ملی
        <span style={{ color: "#ff0000" }}>*</span> :
      </InputLabel>
      <Input
        style={{ fontSize: "small" }}
        defaultValue={defaultState.NationalId}
        inputProps={{ maxLength: 10 }}
        placeholder="کد ملی بیمار"
        id="NationalId"
        {...register("NationalId", {
          required: "پر کردن این فیلد الزامی است!",
          minLength: {
            value: 10,
            message: "مقدار کد ملی حداقل باید 10 عدد باشد!",
          },
          pattern: {
            value: /\d{10}/,
            message: "کد ملی فقط شامل اعداد است",
          },
        })}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          numericValidation(event, "NationalId", "کد ملی");
          dispatch(setNationalId(watch("NationalId")));
          checkNationalIdAl(watch("NationalId"));
        }}
      />
      {checkNIdAl && (
        <Typography color="secondary">
          الگوی کد ملی وارد شده نادرست است!
        </Typography>
      )}
      {errors.NationalId && (
        <Typography color="secondary">{errors.NationalId.message}</Typography>
      )}

      {/* ------------------------ birthday ------------------------ */}
      <InputLabel
        htmlFor="birthday"
        style={{
          color: darkMode ? "#fff" : "#2962ff",
          marginTop: 30,
          fontSize: "14px",
        }}
      >
        تاریخ تولد<span style={{ color: "#ff0000" }}>*</span> :
      </InputLabel>
      <Box display="flex" padding="10px">
        <Input
          defaultValue={defaultState.Birthday}
          id="birthday"
          placeholder="روز / سال / ماه"
          {...register("birthday", {
            required: "ورود تاریخ تولد بیمار الزامی است!",
            pattern: {
              value: /\d{4}-\d{2}-\d{2}/,
              message: "فرمت تاریخ تولد وارد شده نادرست است",
            },
          })}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            numericValidation(event, "birthday", "تاریخ تولد");
            dispatch(setBirthday(watch("birthday")));
          }}
          style={{ fontSize: "small" }}
        />
      </Box>
      {errors.birthday && (
        <Typography color="secondary">{errors.birthday.message}</Typography>
      )}

      {/* ------------------------ telNumbers ------------------------ */}
      {telNumbers.map((input) => (
        <Fragment>
          <InputLabel
            htmlFor={input.id}
            style={{
              color: darkMode ? "#fff" : "#2962ff",
              marginTop: 30,
              fontSize: "14px",
            }}
          >
            {`شماره موبایل${input.value}`} :
          </InputLabel>
          <Box display="flex" padding="10px">
            <Input
              defaultValue={input.defaultState}
              id={input.id}
              placeholder="ادامه شماره"
              inputProps={{ maxLength: 11 }}
              {...register(input.id, {
                required: "پر کردن این فیلد الزامی است!",
                minLength: {
                  value: 11,
                  message: `مقدار شماره موبایل${input.value} حداقل باید 11 عدد باشد!`,
                },
                pattern: {
                  value: /\d{11}/,
                  message: `شماره موبایل${input.value} فقط شامل اعداد است`,
                },
              })}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                numericValidation(
                  event,
                  input.id,
                  `شماره موبایل${input.value}`
                );
                input.dispatcher();
              }}
              style={{ width: "80px", fontSize: "small" }}
            />
            <Typography variant="body1">
              <sub>09</sub>
            </Typography>
          </Box>
          {errors[input.id] && (
            <Typography color="secondary">
              {errors[input.id].message}
            </Typography>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default NumericFields;
