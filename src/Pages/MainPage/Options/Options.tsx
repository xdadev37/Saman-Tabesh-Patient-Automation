import Search from "./Dependencies/Search";
import PageRecordSelector from "./Dependencies/PageRecordSelector";
import { Grid } from "@material-ui/core";
import DateFiltration from "./Dependencies/DateFiltration";
import InfoCard from "./Dependencies/InfoCard";

const Options: React.FC = () => {
  return (
    <Grid container alignItems="center" style={{ marginBottom: 20 }}>
      <Grid item sm={3} md={3} lg={3}>
        <Search />
      </Grid>
      <Grid item sm={1} md={1} lg={1}>
        <PageRecordSelector />
      </Grid>
      <Grid item sm={5} md={5} lg={5}>
        <DateFiltration />
      </Grid>
      <Grid item sm={3} md={3} lg={3}>
        <InfoCard />
      </Grid>
    </Grid>
  );
};

export default Options;
