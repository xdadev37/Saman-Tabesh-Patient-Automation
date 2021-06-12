import { FC, Fragment, ChangeEvent, useState } from "react";
import { InputLabel, Input, Typography, Button, Box } from "@material-ui/core";
import { CheckCircle, Error, NoteAdd } from "@material-ui/icons";
import { useAppSelector } from "../../../../../../Redux/hook";
import { selectDarkMode } from "../../../../../../Redux/Slicer/darkModeSlice";

interface IProps {
  id: string;
  title: string;
  func: (arg: Blob) => void;
}

const FilesFields: FC<IProps> = ({ id, title, func }) => {
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
    <Fragment>
      <InputLabel
        htmlFor={id}
        style={{ color: darkMode ? "#fff" : "#000", marginBottom: 35 }}
      >
        {title}
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<NoteAdd />}
          style={{ marginInline: 30 }}
        >
          {pdfStatus === "ok" ? (
            <CheckCircle style={{ color: "#fff" }} />
          ) : (
            "انتخاب فایل"
          )}
        </Button>
        <Input
          hidden
          style={{ display: "none" }}
          id={id}
          type="file"
          inputProps={{ accept: ".pdf" }}
          onInput={(event: ChangeEvent<HTMLInputElement>) => {
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
                      func(file);
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
      </InputLabel>
      {pdfStatus !== "null" && pdfStatus !== "ok" && (
        <Box
          display="flex"
          border="2px solid #f50057"
          borderRadius="18px"
          alignItems="center"
          justifyContent="center"
          padding="10px"
          marginY={2}
        >
          <Error color="error" />
          &nbsp;
          <Typography color="secondary" variant="body2">
            {pdfStatusElement}
          </Typography>
        </Box>
      )}
    </Fragment>
  );
};

export default FilesFields;
