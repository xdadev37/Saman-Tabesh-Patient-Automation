import { FC, Fragment, useEffect } from "react";

const WebcamImage: FC = () => {
  // const fileReader = new FileReader();

  useEffect(() => {
    const enableWebcam = navigator.mediaDevices.getUserMedia({ video: true });
    const webcamStream = document.querySelector("video")!;

    enableWebcam
      .then((res) => {
        webcamStream.srcObject = res;
      })
      .catch((error) => console.log(error));
  }, []);

  const snap = () => {
    const webcamStream = document.querySelector("video")!;
    const avatar = document.querySelector("img")!;

    webcamStream.autofocus = true;
    const canvas = document.querySelector("canvas")!;
    canvas.getContext("2d")!.drawImage(webcamStream, 0, 0, 150, 100);
    const img64 = canvas.toDataURL("image/jpeg");
    avatar.src = img64;
    canvas.toBlob((img) => {
      img?.arrayBuffer().then((res) => {
        const blob = new Uint8Array(res);
        const img = new Blob([blob]);
      });
    }, "image/jpeg");
  };

  return (
    <Fragment>
      <video onClick={snap} width={200} muted autoPlay />
      <canvas />
      <img alt="Avatar" width={200} height={150} />
    </Fragment>
  );
};

export default WebcamImage;
