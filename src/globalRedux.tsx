import AlertSnackbar from "./UI/AlertSnackbar";
import { Backdrop, CircularProgress, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useAppSelector } from "./Redux/hook";
import {
  selectAlertText,
  selectAlertStatus,
  selectOpen,
} from "./Redux/Slicer/alertMessageSlice";
import { selectBackdrop, selectSkeleton } from "./Redux/Slicer/backdropSlice";

const GlobalRedux: React.FC = () => {
  const alertText = useAppSelector(selectAlertText);
  const alertStatus = useAppSelector(selectAlertStatus);
  const open = useAppSelector(selectOpen);
  const backdrop = useAppSelector(selectBackdrop);
  const skeleton = useAppSelector(selectSkeleton);

  return (
    <Grid container>
      <AlertSnackbar open={open} alertStatus={alertStatus}>
        {alertText}
      </AlertSnackbar>
      <Backdrop open={backdrop} style={{ zIndex: 10000 }}>
        <CircularProgress />
      </Backdrop>
      <Grid container hidden={skeleton} style={{ zIndex: 10000 }}>
        <Skeleton variant="rect" width="100%" height={650} animation="wave" />
        <Skeleton width="100%" height={50} animation="wave" />
      </Grid>
    </Grid>
  );
};

export default GlobalRedux;
