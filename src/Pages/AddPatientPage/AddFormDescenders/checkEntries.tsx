import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import { selectRequiredField } from "../../../Redux/Slicer/patientInfoSlice";
import {
  setAlertText,
  setAlertStatus,
  setOpen,
} from "../../../Redux/Slicer/alertMessageSlice";
import { setBackdrop } from "../../../Redux/Slicer/backdropSlice";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CheckEntriesUI from "../../../UI/AddPatientUI/Subsets/checkEntriesUI";

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

  return (
    <CheckEntriesUI
      submit={submit}
      requiredField={requiredField}
      avatar={avatar}
      nationalIdDoc={nationalIdDoc}
      commitmentDoc={commitmentDoc}
      policyDoc={policyDoc}
    />
  );
};

export default CheckEntries;
