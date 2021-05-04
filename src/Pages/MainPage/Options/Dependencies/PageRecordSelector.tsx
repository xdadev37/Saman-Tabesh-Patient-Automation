import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { useState, ChangeEvent } from "react";

const useStyle = makeStyles(() =>
  createStyles({
    select: {
      width: 80,
    },
  })
);

const PageRecordSelector: React.FC = () => {
  const recordId = "recordId";
  const classes = useStyle();
  const [record, setRecord] = useState("");
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setRecord(event.target.value as string);
  };

  return (
    <FormControl>
      <InputLabel id={recordId}>رکورد</InputLabel>
      <Select
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
      <FormHelperText>انتخاب تعداد رکورد</FormHelperText>
    </FormControl>
  );
};

export default PageRecordSelector;
