import { FC, Fragment, ChangeEvent, useState } from "react";
import { InputLabel, Input, Typography } from "@material-ui/core";

interface IFiles {
  setAvatar: (arg: any) => void;
  setNationalIdDoc: (arg: any) => void;
}

const RequiredFilesFields: FC<IFiles> = ({ setAvatar, setNationalIdDoc }) => {
  const [avatarStatus, setAvatarStatus] = useState(false);
  const [pdfStatus, setPdfStatus] = useState(false);

  return (
    <Fragment>
      {/* Avatar */}
      <InputLabel htmlFor="Avatar">عکس پرسنلی بیمار</InputLabel>
      <Input
        id="Avatar"
        type="file"
        inputProps={{
          accept: ".jpeg, .jpg",
        }}
        onInput={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files![0];
          const fileSize = event.target.files![0].size;

          if (fileSize > 100000) {
            setAvatarStatus(true);
          } else {
            setAvatarStatus(false);
            setAvatar(file);
          }
        }}
      />
      {avatarStatus && (
        <Typography>حجم عکس آپلود شده باید کمتر از 100 کیلوبایت باشد!</Typography>
      )}

      {/* NationalIdDoc */}
      <InputLabel htmlFor="NationalIdDoc">کارت ملی</InputLabel>
      <Input
        id="NationalIdDoc"
        type="file"
        inputProps={{ accept: ".pdf" }}
        onInput={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files![0];
          const fileSize = event.target.files![0].size;

          if (fileSize > 300000) {
            setPdfStatus(true);
          } else {
            setPdfStatus(false);
            setNationalIdDoc(file);
          }
        }}
      />
      {pdfStatus && (
        <Typography>حجم پی دی اف آپلود شده باید کمتر از 300 کیلوبایت باشد!</Typography>
      )}
    </Fragment>
  );
};

export default RequiredFilesFields;
