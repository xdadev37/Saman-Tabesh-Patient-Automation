import { InputLabel, Input } from "@material-ui/core";

const DateFiltration: React.FC = () => {
  return (
    <InputLabel htmlFor="filter" style={{ fontSize: "14px" }}>
    فیلتر بر اساس تاریخ : &nbsp;
      <Input
        id="filter"
        style={{ width: 80, fontSize: "14px" }}
        placeholder="از"
      />
      - &nbsp;
      <Input
        id="filter"
        style={{ width: 80, fontSize: "14px" }}
        placeholder="تا"
      />
    </InputLabel>
  );
};

export default DateFiltration;
