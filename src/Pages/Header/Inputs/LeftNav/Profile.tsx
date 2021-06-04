import { FC, Fragment, useState, MouseEvent } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Add, Edit } from "@material-ui/icons";
import { MyAvatar } from "../../../../UI/Avatar";
import { useAppDispatch } from "../../../../Redux/hook";
import { setLogin } from "../../../../Redux/Slicer/loginSlice";

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
      <IconButton aria-controls="authMenu" onClick={handleMenu}>
        {/* <ExpandMore /> */}
        <MyAvatar alt="Avatar" src="" style={{ alignItems: "center" }}>
          آ
        </MyAvatar>
      </IconButton>
      <Menu
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
        <MenuItem>
          <Button color="secondary" onClick={logout}>
            خروج
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default Profile;
