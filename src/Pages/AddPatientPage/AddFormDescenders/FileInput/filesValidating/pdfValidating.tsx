import { FC, Fragment, ChangeEvent, useState } from "react";
import {
  InputLabel,
  Input,
  Typography,
  Button,
  FormHelperText,
  Box,
} from "@material-ui/core";
import { CheckCircle, NoteAdd, Error } from "@material-ui/icons";
import { useAppSelector } from "../../../../../Redux/hook";
import { selectDarkMode } from "../../../../../Redux/Slicer/darkModeSlice";

interface IProps {
  setNationalIdDoc: (arg: Blob) => void;
}

const PDFValidating: FC<IProps> = ({ setNationalIdDoc }) => {
  const [pdfStatus, setPdfStatus] = useState<string>("null");
  const pdfReader = new FileReader();
  const darkMode = useAppSelector(selectDarkMode);

  let pdfStatusElement;
  switch (pdfStatus) {
    case "size":
      pdfStatusElement =
        "حجم پی دی اف آپلود شده باید کمتر از 300 کیلوبایت باشد!";
      break;

    case "fileFormat":
      pdfStatusElement =
        "فرمت فایل آپلود شده قابل قبول نیست! (فرمت قابل قبول : PDF)";
      break;

    default:
      pdfStatusElement = <Fragment></Fragment>;
  }

  return (
    <InputLabel
      htmlFor="NationalIdDoc"
      style={{ width: "54%", color: darkMode ? "#fff" : "#2962ff" }}
    >
      کارت ملی :
      <Box marginX={10} marginY={2} padding={0}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<NoteAdd />}
        >
          {pdfStatus === "ok" ? (
            <CheckCircle style={{ color: "#fff" }} />
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
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.value !== "") {
            const file = event.target.files![0];
            const fileSize = event.target.files![0].size;
            const fileType = event.target.files![0].type;
            pdfReader.readAsDataURL(file);

            pdfReader.onloadend = () => {
              if (fileType !== "application/pdf") {
                setPdfStatus("fileFormat");
              } else {
                const pdf = atob(String(pdfReader.result).slice(28));

                if (pdf.match(/PDF/)) {
                  if (fileSize > 300000) {
                    setPdfStatus("size");
                  } else {
                    setPdfStatus("ok");
                    setNationalIdDoc(file);
                  }
                } else {
                  setPdfStatus("fileFormat");
                }
              }
            };
          } else {
            setPdfStatus("null");
          }
        }}
      />
      {pdfStatus !== "null" && pdfStatus !== "ok" && (
        <Box
          display="flex"
          border="3px double #f50057"
          borderRadius="18px"
          alignItems="center"
          justifyContent="center"
          padding="10px"
        >
          <Error color="error" />
          &nbsp;
          <Typography color="secondary" variant="body2">
            {pdfStatusElement}
          </Typography>
        </Box>
      )}
      <FormHelperText>
        <Typography variant="subtitle2" component="span">
          حداکثر حجم فایل مجاز : 300 کیلوبایت
          <br />
          فرمت فایل قابل قبول : PDF
        </Typography>
      </FormHelperText>
    </InputLabel>
  );
};

export default PDFValidating;
