import { FC, Fragment } from "react";
import { MyAvatar } from "./Avatar";
import { Typography, Grid } from "@material-ui/core";
import { useAppSelector } from "../Redux/hook";
import { selectRequiredField } from "../Redux/Slicer/patientInfoSlice";

const InfoBar: FC = () => {
  const tempData = useAppSelector(selectRequiredField);
  const avatarFirstLetter = tempData.FamilyName.charAt(0);

  return (
    <Fragment>
      <Grid item style={{ display: "flex", alignItems: "baseline" }}>
        <MyAvatar variant="rounded" alt="avatar" src={tempData.Avatar}>
          {avatarFirstLetter}
        </MyAvatar>
        &nbsp;
        <Typography>{tempData.Name}</Typography>
        &nbsp;
        <Typography>{tempData.FamilyName}</Typography>
      </Grid>
      <Grid item>
        <Typography>{`ش.م : ${tempData.NationalId}`}</Typography>
      </Grid>
    </Fragment>
  );
};

export default InfoBar;
