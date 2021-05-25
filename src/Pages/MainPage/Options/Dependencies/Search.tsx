import {
  InputAdornment,
  InputLabel,
  FormControl,
  Input,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const Search: React.FC = () => {
  const searchId = "searchId";

  return (
    <FormControl>
      <InputLabel htmlFor={searchId}>جستجو</InputLabel>
      <Input
        id={searchId}
        endAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        style={{ width: "400px" }}
      />
    </FormControl>
  );
};

export default Search;
