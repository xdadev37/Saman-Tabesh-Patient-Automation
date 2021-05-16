import { FC, Fragment } from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const HeaderTitle: FC = () => {
  return (
    <Fragment>
      <Typography variant="h6">
        سامانه مدیریت اطلاعات بیماران رادیوتراپی - بیمارستان سلامت فردا
      </Typography>
      <Link to="/">
        <Typography>خانه</Typography>
      </Link>
    </Fragment>
  );
};

export default HeaderTitle;
