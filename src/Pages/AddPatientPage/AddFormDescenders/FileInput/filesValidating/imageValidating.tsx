import { FC, Fragment, ChangeEvent, useState } from "react";
import {
  InputLabel,
  Input,
  Typography,
  Button,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { CheckCircle, Image, Error } from "@material-ui/icons";
import { useAppSelector } from "../../../../../Redux/hook";
import { selectDarkMode } from "../../../../../Redux/Slicer/darkModeSlice";

interface Props {
  setAvatar: (arg: Blob) => void;
}

const ImageValidating: FC<Props> = ({ setAvatar }) => {
  const [avatarStatus, setAvatarStatus] = useState<string>("null");
  const imageReader = new FileReader();
  const darkMode = useAppSelector(selectDarkMode);

  let avatarStatusElement;
  switch (avatarStatus) {
    case "size":
      avatarStatusElement = "حجم عکس آپلود شده باید کمتر از 100 کیلوبایت باشد!";
      break;

    case "fileFormat":
      avatarStatusElement =
        "فرمت عکس آپلود شده قابل قبول نیست! (فرمت قابل قبول : JPG, JPEG)";
      break;

    default:
      avatarStatusElement = <Fragment></Fragment>;
  }

  return (
    <InputLabel
      htmlFor="Avatar"
      style={{ width: "55%", color: darkMode ? "#fff" : "#2962ff" }}
    >
      عکس پرسنلی بیمار :
      <Box marginX={10} marginY={2}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<Image />}
        >
          {avatarStatus === "ok" ? (
            <CheckCircle style={{ color: "#fff" }} />
          ) : (
            "انتخاب عکس"
          )}
        </Button>
      </Box>
      <Input
        hidden
        style={{ display: "none" }}
        id="Avatar"
        type="file"
        inputProps={{
          accept: ".jpeg, .jpg",
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.value !== "") {
            const file = event.target.files![0];
            const fileSize = event.target.files![0].size;
            const fileType = event.target.files![0].type;
            imageReader.readAsDataURL(file);

            imageReader.onloadend = () => {
              if (fileType !== "image/jpeg") {
                setAvatarStatus("fileFormat");
              } else {
                const image = atob(String(imageReader.result).slice(23));

                if (image.match(/JFIF/) === null) {
                  setAvatarStatus("fileFormat");
                } else {
                  if (!image.match(/JFIF/)![0]) {
                    setAvatarStatus("fileFormat");
                  } else {
                    if (fileSize > 100000) {
                      setAvatarStatus("size");
                    } else {
                      setAvatarStatus("ok");
                      setAvatar(file);
                    }
                  }
                }
              }
            };
          } else {
            setAvatarStatus("null");
          }
        }}
      />
      {avatarStatus !== "null" && avatarStatus !== "ok" && (
        <Box
          display="flex"
          border="3px double #f50057"
          borderRadius="18px"
          alignItems="center"
          justifyContent="center"
          padding="10px"
          width="150%"
        >
          <Error color="error" />
          &nbsp;
          <Typography color="secondary" variant="body2">
            {avatarStatusElement}
          </Typography>
        </Box>
      )}
      <FormHelperText>
        <Typography variant="subtitle2" component="span">
          حداکثر حجم فایل مجاز : 100 کیلوبایت
          <br />
          فرمت عکس قابل قبول : JPG, JPEG
        </Typography>
      </FormHelperText>
    </InputLabel>
  );
};

export default ImageValidating;
