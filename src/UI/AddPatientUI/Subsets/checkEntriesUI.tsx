import { Grid, Typography, Button } from "@material-ui/core";
import { Check } from "@material-ui/icons";

interface IProps {
  submit: () => void;
  requiredField: IRequiredFields;
  avatar: Blob | string;
  nationalIdDoc: Blob | string;
  commitmentDoc: Blob | string;
  policyDoc: Blob | string;
}

const CheckEntriesUI: React.FC<IProps> = ({
  submit,
  requiredField,
  avatar,
  nationalIdDoc,
  commitmentDoc,
  policyDoc,
}) => {
  const mainInfo = [
    {
      input1: `نام : ${requiredField.Name}`,
      input2: `نام خانوادگی بیمار : ${requiredField.FamilyName}`,
      key: 1,
    },
    {
      input1: `تاریخ تولد بیمار : ${requiredField.Birthday}`,
      input2: `کد ملی بیمار : ${requiredField.NationalId}`,
      key: 2,
    },
    {
      input1: `شماره موبایل بیمار : ${requiredField.mobileNo}`,
      input2: `شماره موبایل اضطراری : ${
        requiredField.emergencyMobileNo === ""
          ? "ندارد"
          : requiredField.emergencyMobileNo
      }`,
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
          border: "0.000001px dashed #000",
        }}
      />
    );

    return (
      <Grid
        container
        justify="space-around"
        alignItems="baseline"
        className="hr"
      >
        <Grid item sm={5} md={5} lg={5}>
          {separateLine}
        </Grid>
        <Grid item sm={1} md={1} lg={1}>
          <Typography color="primary">{topic}</Typography>
        </Grid>
        <Grid item sm={5} md={5} lg={5}>
          {separateLine}
        </Grid>
      </Grid>
    );
  };

  return (
    <form autoComplete="off" onSubmit={submit}>
      <Grid container justify="space-around" id="checkEntries">
        <Typography color="primary" variant="h6">
          مرور کلی اطلاعات وارد شده
        </Typography>
        <br />
        <br />
        {Topics("اطلاعات هویتی")}
        {mainInfo.map((input) => (
          <Grid item key={input.key}>
            <Typography>{input.input1}</Typography>
            <Typography>{input.input2}</Typography>
          </Grid>
        ))}
        {Topics("اطلاعات درمانی")}
        <Grid container>
          <Grid container justify="space-evenly">
            {medicalInfo.map((input) => (
              <Typography key={input}>{input}</Typography>
            ))}
          </Grid>
          <Grid item>
            <br />
            <Typography> توضیحات تکمیلی :</Typography>
            <Typography
              style={{ backgroundColor: "#ccc", borderRadius: 8, padding: 5 }}
            >
              {requiredField.Comment === "" ? (
                <Typography color="secondary" component="span">
                  فاقد توضیحات
                </Typography>
              ) : (
                requiredField.Comment
              )}
            </Typography>
          </Grid>
        </Grid>
        {Topics("مدارک ثبت شده")}
        <Grid container justify="space-evenly">
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
          style={{ width: "20%" }}
        >
          ثبت نهایی اطلاعات
        </Button>
      </Grid>
    </form>
  );
};

export default CheckEntriesUI;
