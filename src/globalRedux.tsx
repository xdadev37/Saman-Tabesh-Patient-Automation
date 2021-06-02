import { FC, Fragment } from "react";
import AlertSnackbar from "./UI/AlertSnackbar";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { useAppSelector } from "./Redux/hook";
import {
  selectAlertText,
  selectAlertStatus,
  selectOpen,
} from "./Redux/Slicer/alertMessageSlice";
import { selectBackdrop } from "./Redux/Slicer/backdropSlice";

const GlobalRedux: FC = () => {
  const alertText = useAppSelector(selectAlertText);
  const alertStatus = useAppSelector(selectAlertStatus);
  const open = useAppSelector(selectOpen);
  const backdrop = useAppSelector(selectBackdrop);

  return (
    <Fragment>
      <AlertSnackbar open={open} alertStatus={alertStatus}>
        {alertText}
      </AlertSnackbar>
      <Backdrop open={backdrop} style={{ zIndex: 10000 }}>
        <CircularProgress />
      </Backdrop>
    </Fragment>
  );
};

export default GlobalRedux;
