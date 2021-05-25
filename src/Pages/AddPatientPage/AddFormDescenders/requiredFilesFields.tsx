import { FC, Fragment, ChangeEvent, useState } from "react";
import {
  InputLabel,
  Input,
  Typography,
  Button,
  FormHelperText,
  Box,
  TextField,
} from "@material-ui/core";
import {
  CheckCircle,
  Image,
  NoteAdd,
  Error,
  BorderColor,
} from "@material-ui/icons";
import { useAppDispatch } from "../../../Redux/hook";
import { setComment } from "../../../Redux/Slicer/patientInfoSlice";

interface IFiles {
  setAvatar: (arg: Blob) => void;
  setNationalIdDoc: (arg: Blob) => void;
}

const RequiredFilesFields: FC<IFiles> = ({ setAvatar, setNationalIdDoc }) => {
  const [avatarStatus, setAvatarStatus] = useState<boolean | null>(null);
  const [pdfStatus, setPdfStatus] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();

  let pdfStatusElement;
  switch (pdfStatus) {
    case true:
      pdfStatusElement = (
        <Typography color="secondary">
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
        <Typography color="secondary">
          <Error color="error" />
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
        {">"} عکس پرسنلی بیمار :
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
        {">"} کارت ملی :
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

      {/* Comment */}
      <hr />
      <InputLabel
        style={{ width: "320px", color: "#000", marginBottom: "10px" }}
      >
        <BorderColor />
        <span style={{ marginInline: "10px" }}>توضیحات</span>
      </InputLabel>
      <TextField
        autoComplete="off"
        label="توضیحات تکمیلی"
        variant="filled"
        multiline
        rows={4}
        fullWidth
        inputProps={{ maxLength: 800 }}
        onInput={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch(setComment(event.target.value));
        }}
      />
      <FormHelperText>
        <Typography
          variant="subtitle2"
          component="span"
          style={{ width: "320px", color: "#000" }}
        >
          راهنما :
          <br />
          حداکثر تعداد کاراکتر مجاز : 800
          <br />
          در آخر برای ثبت نهایی دکمه ثبت را بفشارید
        </Typography>
      </FormHelperText>
    </Fragment>
  );
};

export default RequiredFilesFields;
