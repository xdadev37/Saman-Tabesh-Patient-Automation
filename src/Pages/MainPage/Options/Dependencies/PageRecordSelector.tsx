import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { FC, useState, ChangeEvent } from "react";

const useStyle = makeStyles(() =>
  createStyles({
    select: {
      width: 80,
    },
  })
);

const PageRecordSelector: FC = () => {
  const recordId = "recordId";
  const classes = useStyle();
  const [record, setRecord] = useState("");
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setRecord(String(event.target.value));
  };

  return (
    <FormControl>
      <InputLabel style={{ fontSize: "13px" }} id={recordId}>
        رکورد
      </InputLabel>
      <Select
        style={{ width: "80%", fontSize: "small" }}
        onChange={handleChange}
        value={record}
        className={classes.select}
        labelId={recordId}
      >
        <MenuItem value={Infinity}>
          <em>همه</em>
        </MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={25}>25</MenuItem>
      </Select>
      <FormHelperText>تعداد رکورد</FormHelperText>
    </FormControl>
  );
};

export default PageRecordSelector;
