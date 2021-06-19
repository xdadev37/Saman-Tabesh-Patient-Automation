import { MyAvatar } from "./Avatar";
import { Typography, Grid, Paper } from "@material-ui/core";
import { useAppSelector } from "../Redux/hook";
import { selectRequiredField } from "../Redux/Slicer/patientInfoSlice";

const InfoBar: React.FC = () => {
  const tempData = useAppSelector(selectRequiredField);
  const avatarFirstLetter = tempData.FamilyName.charAt(0);

  return (
    <Grid container component={Paper}>
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
    </Grid>
  );
};

export default InfoBar;
