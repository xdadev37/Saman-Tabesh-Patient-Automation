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
      <InputLabel style={{ fontSize: "13px" }} htmlFor={searchId}>
        جستجو
      </InputLabel>
      <Input
        id={searchId}
        endAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Search;
