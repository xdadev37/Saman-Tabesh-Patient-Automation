import { FC, Fragment, useState, MouseEvent } from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";

const Profile: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Fragment>
      <IconButton aria-controls="authMenu" onClick={handleMenu}>
        <Avatar alt="Avatar" src=""></Avatar>
      </IconButton>
      <Menu
        id="authMenu"
        anchorEl={anchorEl}
        open={open}
        keepMounted
        onClose={() => setAnchorEl(null)}
      >
        {<MenuItem>ایجاد مجوز برای پزشکان</MenuItem>}
        <MenuItem>تغییر گذرواژه</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default Profile;
