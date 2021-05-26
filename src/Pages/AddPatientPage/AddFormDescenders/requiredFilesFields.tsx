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
import { useAppDispatch, useAppSelector } from "../../../Redux/hook";
import {
  setComment,
  selectRequiredField,
} from "../../../Redux/Slicer/patientInfoSlice";

interface IFiles {
  setAvatar: (arg: Blob) => void;
  setNationalIdDoc: (arg: Blob) => void;
}

const RequiredFilesFields: FC<IFiles> = ({ setAvatar, setNationalIdDoc }) => {
  const [avatarStatus, setAvatarStatus] = useState<string>("null");
  const [pdfStatus, setPdfStatus] = useState<string>("null");
  const dispatch = useAppDispatch();
  const commentValue = useAppSelector(selectRequiredField);

  let pdfStatusElement;
  switch (pdfStatus) {
    case "size":
      pdfStatusElement = (
        <Typography color="secondary" variant="body2">
          <Error color="error" />
          حجم پی دی اف آپلود شده باید کمتر از 300 کیلوبایت باشد!
        </Typography>
      );
      break;

    case "fileFormat":
      pdfStatusElement = (
        <Typography color="secondary" variant="body2">
          <Error color="error" />
          فرمت فایل آپلود شده قابل قبول نیست! (فرمت قابل قبول : PDF)
        </Typography>
      );
      break;

    default:
      pdfStatusElement = <Fragment></Fragment>;
  }

  let avatarStatusElement;
  switch (avatarStatus) {
    case "size":
      avatarStatusElement = (
        <Typography color="secondary" variant="body2">
          <Error color="error" />
          حجم پی دی اف آپلود شده باید کمتر از 100 کیلوبایت باشد!
        </Typography>
      );
      break;

    case "fileFormat":
      avatarStatusElement = (
        <Typography color="secondary" variant="body2">
          <Error color="error" />
          فرمت عکس آپلود شده قابل قبول نیست! (فرمت قابل قبول : JPG, JPEG)
        </Typography>
      );
      break;

    default:
      avatarStatusElement = <Fragment></Fragment>;
  }

  return (
    <Fragment>
      {/* Avatar */}
      <InputLabel htmlFor="Avatar" style={{ width: "320px", color: "#2962ff" }}>
        عکس پرسنلی بیمار :
        <Box marginX={10} marginY={2}>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            startIcon={<Image />}
          >
            {avatarStatus === "ok" ? (
              <CheckCircle color="primary" />
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
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
            if (event.target.value !== "") {
              const file = event.target.files![0];
              const fileSize = event.target.files![0].size;
              const fileType = event.target.files![0].type;

              if (fileSize > 100000) {
                setAvatarStatus("size");
              }
              if (fileType !== "image/jpeg") {
                setAvatarStatus("fileFormat");
              } else {
                setAvatarStatus("ok");
                setAvatar(file);
              }
            } else {
              setAvatarStatus("null");
            }
          }}
        />
        {avatarStatusElement}
        <FormHelperText>
          <Typography variant="subtitle2" component="span">
            حداکثر حجم فایل مجاز : 100 کیلوبایت
            <br />
            فرمت عکس قابل قبول : JPG, JPEG
          </Typography>
        </FormHelperText>
      </InputLabel>

      <hr />

      {/* NationalIdDoc */}
      <InputLabel
        htmlFor="NationalIdDoc"
        style={{ width: "320px", color: "#2962ff" }}
      >
        کارت ملی :
        <Box marginX={10} marginY={2} padding={0}>
          <Button
            variant="outlined"
            color="primary"
            component="span"
            startIcon={<NoteAdd />}
          >
            {pdfStatus === "ok" ? (
              <CheckCircle color="primary" />
            ) : (
              "انتخاب فایل"
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
              const fileType = event.target.files![0].type;

              if (fileSize > 300000) {
                setPdfStatus("size");
              } else {
                if (fileType !== "application/pdf") {
                  setPdfStatus("fileFormat");
                } else {
                  setPdfStatus("ok");
                  setNationalIdDoc(file);
                }
              }
            } else {
              setPdfStatus("null");
            }
          }}
        />
        {pdfStatusElement}
        <FormHelperText>
          <Typography variant="subtitle2" component="span">
            حداکثر حجم فایل مجاز : 300 کیلوبایت
            <br />
            فرمت فایل قابل قبول : PDF
          </Typography>
        </FormHelperText>
      </InputLabel>

      {/* Comment */}
      <hr />
      <InputLabel
        style={{ width: "320px", color: "#2962ff", marginBottom: "10px" }}
      >
        <BorderColor />
        &nbsp; توضیحات
      </InputLabel>
      <TextField
        defaultValue={commentValue.Comment}
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
          حداکثر تعداد برای توضیحات کاراکتر مجاز : 800
          <br />
          در آخر برای ثبت نهایی دکمه ثبت را بفشارید
        </Typography>
      </FormHelperText>
    </Fragment>
  );
};

export default RequiredFilesFields;
