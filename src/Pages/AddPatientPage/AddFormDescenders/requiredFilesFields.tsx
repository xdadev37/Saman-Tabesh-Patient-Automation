import { FC, Fragment, ChangeEvent, useState } from "react";
import {
  InputLabel,
  Input,
  Typography,
  Button,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { CheckCircle, Image, NoteAdd } from "@material-ui/icons";

interface IFiles {
  setAvatar: (arg: any) => void;
  setNationalIdDoc: (arg: any) => void;
}

const RequiredFilesFields: FC<IFiles> = ({ setAvatar, setNationalIdDoc }) => {
  const [avatarStatus, setAvatarStatus] = useState<boolean | null>(null);
  const [pdfStatus, setPdfStatus] = useState<boolean | null>(null);

  let pdfStatusElement;
  switch (pdfStatus) {
    case true:
      pdfStatusElement = (
        <Typography>
          حجم پی دی اف آپلود شده باید کمتر از 300 کیلوبایت باشد!
        </Typography>
      );
      break;

    default:
      pdfStatusElement = <Fragment></Fragment>;
  }

  let avatarStatusElement;
  switch (avatarStatus) {
    case true:
      avatarStatusElement = (
        <Typography>
          حجم پی دی اف آپلود شده باید کمتر از 100 کیلوبایت باشد!
        </Typography>
      );
      break;

    default:
      avatarStatusElement = <Fragment></Fragment>;
  }

  return (
    <Fragment>
      {/* Avatar */}
      <InputLabel htmlFor="Avatar" style={{ width: "320px", color: "#000" }}>
        عکس پرسنلی بیمار :
        <Box marginX={10} marginY={2}>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            startIcon={<Image />}
          >
            {avatarStatus === false ? (
              <CheckCircle color="primary" />
            ) : (
              "انتخاب عکس ..."
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
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.value !== "") {
              const file = event.target.files![0];
              const fileSize = event.target.files![0].size;

              if (fileSize > 100000) {
                setAvatarStatus(true);
              } else {
                setAvatarStatus(false);
                setAvatar(file);
              }
            } else {
              setAvatarStatus(null);
            }
          }}
        />
        {avatarStatusElement}
        <FormHelperText>
          <Typography variant="subtitle2" component="span">
            حداکثر حجم فایل مجاز : 100 کیلوبایت
          </Typography>
        </FormHelperText>
      </InputLabel>

      <hr />

      {/* NationalIdDoc */}
      <InputLabel
        htmlFor="NationalIdDoc"
        style={{ width: "320px", color: "#000" }}
      >
        کارت ملی :
        <Box marginX={10} marginY={2} padding={0}>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            startIcon={<NoteAdd />}
          >
            {pdfStatus === false ? (
              <CheckCircle color="primary" />
            ) : (
              "انتخاب فایل ..."
            )}
          </Button>
        </Box>
        <Input
          hidden
          style={{ display: "none" }}
          id="NationalIdDoc"
          type="file"
          inputProps={{ accept: ".pdf" }}
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.value !== "") {
              const file = event.target.files![0];
              const fileSize = event.target.files![0].size;

              if (fileSize > 300000) {
                setPdfStatus(true);
              } else {
                setPdfStatus(false);
                setNationalIdDoc(file);
              }
            } else {
              setPdfStatus(null);
            }
          }}
        />
        {pdfStatusElement}
        <FormHelperText>
          <Typography variant="subtitle2" component="span">
            حداکثر حجم فایل مجاز : 300 کیلوبایت
          </Typography>
        </FormHelperText>
      </InputLabel>
    </Fragment>
  );
};

export default RequiredFilesFields;
