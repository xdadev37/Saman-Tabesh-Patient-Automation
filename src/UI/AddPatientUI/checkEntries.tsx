import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import {
  setAlertText,
  setAlertStatus,
  setOpen,
} from "../../Redux/Slicer/alertMessageSlice";
import { setBackdrop } from "../../Redux/Slicer/backdropSlice";
import axios from "axios";
import { useHistory } from "react-router-dom";

interface IProps {
  avatar: Blob | string;
  nationalIdDoc: Blob | string;
  commitmentDoc: Blob | string;
  policyDoc: Blob | string;
  checkNIdAl: boolean;
}

const CheckEntries: React.FC<IProps> = ({
  avatar,
  nationalIdDoc,
  commitmentDoc,
  policyDoc,
  checkNIdAl,
}) => {
  const dataGrid = new FormData();
  const dispatch = useAppDispatch();
  const requiredField = useAppSelector(selectRequiredField);
  const history = useHistory();

  const submit = async () => {
    dataGrid.append("Name", requiredField.Name);
    dataGrid.append("FamilyName", requiredField.FamilyName);
    dataGrid.append("NationalId", requiredField.NationalId);
    dataGrid.append("Avatar", avatar);
    dataGrid.append("NationalIdDoc", nationalIdDoc);
    dataGrid.append("Comment", requiredField.Comment);
    dataGrid.append("Diagnosis", requiredField.Diagnosis);
    dataGrid.append("Insurance", requiredField.Insurance);
    dataGrid.append("CommitmentDoc", commitmentDoc);
    dataGrid.append("PolicyDoc", policyDoc);
    dataGrid.append("MobileNo", requiredField.mobileNo);
    dataGrid.append("EmergencyMobileNo", requiredField.emergencyMobileNo);
    dataGrid.append("Birthday", requiredField.Birthday);

    if (checkNIdAl === false) {
      dispatch(setBackdrop());
      const axiosPromise = new Promise((sent, rejected) => {
        axios
          .post(
            "https://my-json-server.typicode.com/xdadev37/jsonDatabase/requiredForm",
            dataGrid
          )
          .then((res) => {
            console.log(res);
            if (res.status === 201) {
              dispatch(setAlertText("اطلاعات اولیه بیمار با موفقیت ثبت شد"));
              dispatch(setAlertStatus("success"));
              history.push("/");

              sent(dispatch(setOpen(true)));
            } else {
              dispatch(setAlertText("ثبت اطلاعات انجام نشد"));
              dispatch(setAlertStatus("error"));

              rejected(dispatch(setOpen(true)));
            }
          })
          .catch((error) => {
            console.log(error.request);
            if (error.request.responseText === "") {
              dispatch(setAlertText("ارتباط با سرور برقرار نیست"));
            } else {
              dispatch(setAlertText(error.request.responseText));
            }

            dispatch(setAlertStatus("error"));
            rejected(dispatch(setOpen(true)));
          })
          .finally(() => dispatch(setBackdrop()));
      });

      await axiosPromise;
    }
  };

  const mainInfo = [
    {
      input1: `نام : ${requiredField.Name}`,
      input2: `نام خانوادگی بیمار : ${requiredField.FamilyName}`,
      key: 1,
    },
    {
      input1: `تاریخ تولد بیمار : ${requiredField.Birthday.slice(
        6,
        8
      )} / ${requiredField.Birthday.slice(
        4,
        6
      )} / ${requiredField.Birthday.slice(0, 4)}`,
      input2: `کد ملی بیمار : ${requiredField.NationalId}`,
      key: 2,
    },
    {
      input1: `شماره موبایل بیمار : ${requiredField.mobileNo}`,
      input2: `شماره موبایل اضطراری : ${requiredField.emergencyMobileNo}`,
      key: 3,
    },
  ];

  const medicalInfo = [
    `نام بیماری : ${requiredField.Diagnosis}`,
    `نوع بیمه : ${requiredField.Insurance}`,
  ];

  const filesInfo = [
    { text: "عکس پرسنلی", state: avatar },
    { text: "کارت ملی", state: nationalIdDoc },
    { text: "فرم رضایت بیمار", state: commitmentDoc },
    { text: "فرم پذیرش شرایط بخش", state: policyDoc },
  ];

  const Topics = (topic: string) => {
    const separateLine = (
      <hr
        style={{
          width: "45%",
          borderStyle: "dashed",
          height: 0,
        }}
      />
    );

    return (
      <Grid container justify="space-around" alignItems="baseline">
        {separateLine}
        <Typography color="primary">{topic}</Typography>
        {separateLine}
      </Grid>
    );
  };

  return (
    <form autoComplete="off" onSubmit={submit}>
      <Grid container justify="space-around" component={Paper}>
        {Topics("اطلاعات هویتی")}
        {mainInfo.map((input) => (
          <Grid item key={input.key}>
            <Typography>{input.input1}</Typography>
            <Typography>{input.input2}</Typography>
          </Grid>
        ))}
        {Topics("اطلاعات درمانی")}
        <Grid container justify="space-between">
          <Grid container>
            {medicalInfo.map((input) => (
              <Typography key={input}>{input}</Typography>
            ))}
          </Grid>
          <Grid item>
            <Typography> توضیحات تکمیلی : {requiredField.Comment}</Typography>
          </Grid>
        </Grid>
        {Topics("مدارک ثبت شده")}
        <Grid container>
          {filesInfo.map((input) => (
            <Typography key={input.text}>
              {input.text} :
              <Typography
                component="span"
                color={input.state === "" ? "secondary" : "primary"}
              >
                {input.state === "" ? "ندارد" : "دارد"}
              </Typography>
            </Typography>
          ))}
        </Grid>
      </Grid>

      <Grid container justify="flex-end">
        <Button
          type="submit"
          size="small"
          startIcon={<Check fontSize="small" />}
          variant="contained"
          color="primary"
          style={{ width: "30%" }}
        >
          ثبت نهایی اطلاعات
        </Button>
      </Grid>
    </form>
  );
};

export default CheckEntries;
