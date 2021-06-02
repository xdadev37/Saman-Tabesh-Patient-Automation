import { FC, useState } from "react";
import axios from "axios";
import { useAppDispatch } from "../../../Redux/hook";
import {
  setAlertStatus,
  setAlertText,
  setOpen,
} from "../../../Redux/Slicer/alertMessageSlice";
import { setBackdrop } from "../../../Redux/Slicer/backdropSlice";
import { setLogin } from "../../../Redux/Slicer/loginSlice";
import LoginUI from "../../../UI/LoginUI";

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    dispatch(setBackdrop());
    await new Promise((authorized, unAuthorized) => {
      axios
        .post("/api/login", {
          email: username,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            window.sessionStorage.setItem("token", res.data.token);
            authorized(dispatch(setLogin()));
          } else {
            dispatch(setAlertStatus("error"));
            dispatch(setAlertText("نام کاربری و یا گذرواژه اشتباه است"));

            unAuthorized(dispatch(setOpen(true)));
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
          unAuthorized(setOpen(true));
        })
        .finally(() => setBackdrop());
    });
  };

  return (
    <LoginUI
      setUsername={setUsername}
      setPassword={setPassword}
      submit={submit}
    />
  );
};

export default Login;
