import { FC, useEffect } from "react";
import { Avatar, Grid } from "@material-ui/core";

interface IProps {
  avatar: string;
  setAvatar: (arg: string) => void;
  setVideoSrc: (arg: HTMLVideoElement) => void;
}

const WebcamImage: FC<IProps> = ({ setAvatar, setVideoSrc, avatar }) => {
  useEffect(() => {
    const enableWebcam = navigator.mediaDevices.getUserMedia({ video: true });
    const webcamStream = document.querySelector("video")!;
    setVideoSrc(webcamStream);

    enableWebcam
      .then((res) => {
        webcamStream.srcObject = res;
      })
      .catch((error) => {
        const errorMessage = String(error);

        if (errorMessage.match(/Requested device not found/)) {
          alert("نبود وبک");
        } else {
          if (errorMessage.match(/Permission denied/)) {
            alert("دسترسی وبک داده نشده");
          } else {
            alert("مشکلی پیش آمده");
          }
        }
      });
  }, [setVideoSrc]);

  const snap = () => {
    const webcamStream = document.querySelector("video")!;
    const canvas = document.querySelector("canvas")!;
    canvas.getContext("2d")!.drawImage(webcamStream, 75, 0, 150, 150);
    const img64 = canvas.toDataURL("image/jpeg");
    setAvatar(img64);
  };

  return (
    <Grid container justify="space-around">
      <video
        onClick={snap}
        width={200}
        muted
        autoPlay
        style={{ border: "3px groove #ccc", borderRadius: "50%" }}
      />
      <canvas hidden />
      <Avatar alt="Avatar" src={avatar} style={{ width: 100, height: 100 }} />
    </Grid>
  );
};

export default WebcamImage;
