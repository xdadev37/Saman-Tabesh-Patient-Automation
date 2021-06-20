import { FC, useEffect, useState } from "react";
import { Avatar, Grid, Typography, Backdrop } from "@material-ui/core";
import webcamGuide from "./GuidePics/webcamPermissionGuide.png";
import permissionGuide from "./GuidePics/permissionGuide.png";
import permissionGuide3 from "./GuidePics/permissionGuide3.png";
import { useAppDispatch,useAppSelector } from "../../../../redux/hook";
import { selectRequiredField,setAvatar } from "../../../../redux/Slicer/AddDataSlice/patientInfoSlice";

interface IProps {
  setVideoSrc: (arg: HTMLVideoElement) => void;
}

const WebcamImage: FC<IProps> = ({ setVideoSrc }) => {
  const [webcamError, setWebcamError] = useState(0);
  const dispatch = useAppDispatch()
  const avatar = useAppSelector(selectRequiredField)

  useEffect(() => {
    const enableWebcam = navigator.mediaDevices.getUserMedia({ video: true });

    enableWebcam
      .then((res) => {
        setWebcamError(3);
        const webcamStream = document.querySelector("video")!;
        setVideoSrc(webcamStream);
        webcamStream.srcObject = res;
      })
      .catch((error) => {
        const errorMessage = String(error);

        if (errorMessage.match(/Requested device not found/)) {
          setWebcamError(1);
        } else {
          if (errorMessage.match(/Permission denied/)) {
            setWebcamError(2);
          } else {
            console.log(error);
            setWebcamError(4);
          }
        }
      });
  }, [setVideoSrc]);

  const snap = () => {
    const webcamStream = document.querySelector("video")!;
    const canvas = document.querySelector("canvas")!;
    canvas.getContext("2d")!.drawImage(webcamStream, 55, 0, 200, 150);
    const img64 = canvas.toDataURL("image/png");
    dispatch(setAvatar(img64));
  };

  let webcamStatus;
  switch (webcamError) {
    case 0:
      webcamStatus = (
        <Backdrop open={true} style={{ zIndex: 1000 }}>
          <img
            alt="webcamGuide"
            src={webcamGuide}
            style={{ borderRadius: "18px" }}
          />
        </Backdrop>
      );
      break;

    case 1:
      webcamStatus = (
        <Grid
          container
          style={{
            border: "5px outset #f50057",
            borderRadius: "18px",
            padding: 10,
          }}
        >
          <Typography color="error">وبکم شناسایی نشد</Typography>
        </Grid>
      );
      break;

    case 2:
      webcamStatus = (
        <Grid
          container
          direction="column"
          style={{ border: "5px outset #f50057", borderRadius: "18px" }}
        >
          <img
            alt="permissionGuide"
            src={permissionGuide}
            style={{ borderRadius: "18px" }}
          />
          <img
            alt="permissionGuide3"
            src={permissionGuide3}
            style={{ borderRadius: "18px" }}
          />
        </Grid>
      );
      break;

    case 3:
      webcamStatus = (
        <Grid container alignItems="center">
          <Typography color="primary">پخش زنده : &nbsp; </Typography>
          <video
            onClick={snap}
            width={100}
            height={100}
            muted
            autoPlay
            style={{
              border: "5px outset #f50057",
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "3px 3px 15px 3px",
            }}
          />
        </Grid>
      );
      break;

    case 4:
      webcamStatus = (
        <Grid
          container
          style={{
            border: "5px outset #f50057",
            borderRadius: "18px",
            padding: 10,
          }}
        >
          <Typography color="error">مشکلی پیش آمده</Typography>
        </Grid>
      );
      break;

    default:
      <></>;
  }

  return (
    <Grid container justify="space-around" alignItems="center">
      <Grid item>
        {webcamStatus}
        <canvas hidden />
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Typography color="secondary">
            پیش نمایش عکس پرسنلی : &nbsp;
          </Typography>
          <Avatar
            alt="Avatar"
            src={avatar.Avatar}
            style={{
              width: 100,
              height: 100,
              border: "5px outset #2962ff",
              boxShadow: "3px 3px 15px 3px #000",
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WebcamImage;
