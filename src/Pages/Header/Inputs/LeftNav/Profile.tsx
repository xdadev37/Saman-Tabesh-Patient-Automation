import { FC, Fragment, useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Add, Edit, ExpandMore } from "@material-ui/icons";
import { useAppDispatch } from "../../../../redux/hook";
import { setLogin } from "../../../../redux/Slicer/AuthSlice/loginSlice";

const Profile: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    window.sessionStorage.removeItem("token");
    dispatch(setLogin());
  };

  return (
    <Fragment>
      <IconButton aria-controls="authMenu" onClick={handleMenu} size="small">
        <ExpandMore />
      </IconButton>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id="authMenu"
        anchorEl={anchorEl}
        open={open}
        keepMounted
        onClose={() => setAnchorEl(null)}
      >
        {
          <MenuItem>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="ایجاد مجوز برای پزشکان" />
          </MenuItem>
        }
        <MenuItem>
          <ListItemIcon>
            <Edit />
          </ListItemIcon>
          <ListItemText primary="تغییر گذرواژه" />
        </MenuItem>
        <hr />
        <MenuItem button onClick={logout} style={{ color: "#f50057" }}>
          خروج
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default Profile;
