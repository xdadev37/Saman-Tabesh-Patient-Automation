import Search from "./Dependencies/Search";
import PageRecordSelector from "./Dependencies/PageRecordSelector";
import { Grid } from "@material-ui/core";

const Options: React.FC = () => {
  return (
    <Grid container justify="space-around">
      <Search />
      <PageRecordSelector />
    </Grid>
  );
};

export default Options;
