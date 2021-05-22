import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

interface IProps {
  alertStatus: string;
}

const AlertModals: React.FC<IProps> = ({ alertStatus, children }) => {
  let AlertModel;

  switch (alertStatus) {
    case "success":
      AlertModel = <Alert>{children}</Alert>;
      break;

    case "warning":
      AlertModel = <Alert>{children}</Alert>;
      break;

    case "info":
      AlertModel = <Alert>{children}</Alert>;
      break;

    case "error":
      AlertModel = <Alert>{children}</Alert>;
      break;

    default:
      AlertModel = <Alert>{children}</Alert>;
  }

  return <Snackbar>{AlertModel}</Snackbar>;
};

export default AlertModals;
