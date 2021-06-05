import { FC, useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { selectRequiredField } from "../../Redux/Slicer/patientInfoSlice";
import { setBackdrop } from "../../Redux/Slicer/backdropSlice";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChevronRight } from "@material-ui/icons";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../Redux/Slicer/alertMessageSlice";
import AddPatientUI from "../../UI/AddPatientUI";

const AddPatientPage: FC = () => {
  const requiredField = useAppSelector(selectRequiredField);
  const methods = useForm();
  const { handleSubmit, watch } = methods;
  const [avatar, setAvatar] = useState<Blob | string>("");
  const [nationalIdDoc, setNationalIdDoc] = useState<Blob | string>("");
  const dispatch = useAppDispatch();
  let history = useHistory();
  const [checkNIdAl, setCheckNIdAl] = useState(false);
  const dataGrid = new FormData();

  useEffect(() => {
    setOpen(false);
  }, []);

  const submit = async () => {
    dataGrid.append("Name", requiredField.Name);
    dataGrid.append("FamilyName", requiredField.FamilyName);
    dataGrid.append("NationalId", requiredField.NationalId);
    dataGrid.append("FileNumber", requiredField.FileNumber);
    dataGrid.append("Avatar", avatar);
    dataGrid.append("NationalIdDoc", nationalIdDoc);
    dataGrid.append("Comment", requiredField.Comment);

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

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" onSubmit={handleSubmit(submit)}>
        <Button
          variant="outlined"
          startIcon={<ChevronRight />}
          onClick={() => history.push("/")}
          style={{ float: "left", marginInline: 30 }}
        >
          برگشت
        </Button>

        <AddPatientUI
          requiredField={requiredField}
          watch={watch}
          setAvatar={setAvatar}
          setNationalIdDoc={setNationalIdDoc}
          checkNIdAl={checkNIdAl}
          setCheckNIdAl={setCheckNIdAl}
        />
      </form>
    </FormProvider>
  );
};

export default AddPatientPage;
