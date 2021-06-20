import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/GlobalReduxUIState/alertMessageSlice";
import { setBackdrop } from "../../../Redux/Slicer/GlobalReduxUIState/backdropSlice";
import { setLogin } from "../../../Redux/Slicer/AuthSlice/loginSlice";
import {
  selectUsername,
  selectPass,
} from "../../../Redux/Slicer/AuthSlice/userPassSlice";
import LoginUI from "../../../UI/LoginUI";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername);
  const password = useAppSelector(selectPass);

  const submit = () => {
    dispatch(setBackdrop(true));
    axios
      .post("https://reqres.in/api/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          window.sessionStorage.setItem("token", res.data.token);
          dispatch(setLogin());
        } else {
          dispatch(setAlertStatus("error"));
          dispatch(setAlertText("نام کاربری و یا گذرواژه اشتباه است"));

          dispatch(setOpen(true));
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.request.responseText === "") {
          dispatch(setAlertText("ارتباط با سرور برقرار نیست"));
        } else {
          dispatch(setAlertText(error.request.responseText));
        }

        dispatch(setAlertStatus("error"));
        setOpen(true);
      })
      .finally(() => dispatch(setBackdrop(false)));
  };

  return <LoginUI submit={submit} />;
};

export default Login;
