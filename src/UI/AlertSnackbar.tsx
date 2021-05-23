import { FC, SyntheticEvent } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAppDispatch } from "../Redux/hook";
import { setOpen } from "../Redux/Slicer/alertMessageSlice";

interface IProps {
  alertStatus: string;
  open: boolean;
}

const AlertModals: FC<IProps> = ({ alertStatus, children, open }) => {
  const dispatch = useAppDispatch();

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setOpen(false));
  };

  let AlertModel;
  switch (alertStatus) {
    case "success":
      AlertModel = (
        <Alert variant="filled" onClose={handleClose} severity="success">
          {children}
        </Alert>
      );
      break;

    case "warning":
      AlertModel = (
        <Alert variant="filled" onClose={handleClose} severity="warning">
          {children}
        </Alert>
      );
      break;

    case "info":
      AlertModel = (
        <Alert variant="filled" onClose={handleClose} severity="info">
          {children}
        </Alert>
      );
      break;

    case "error":
      AlertModel = (
        <Alert variant="filled" onClose={handleClose} severity="error">
          {children}
        </Alert>
      );
      break;

    default:
      AlertModel = (
        <Alert variant="filled" onClose={handleClose} severity="success">
          {children}
        </Alert>
      );
  }

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      {AlertModel}
    </Snackbar>
  );
};

export default AlertModals;
