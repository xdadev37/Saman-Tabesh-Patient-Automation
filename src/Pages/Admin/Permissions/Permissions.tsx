import { FC, useState } from "react";
import PermissionUI from "../../../UI/PermissionsUI";

const Permissions: FC = () => {
  const [avatar, setAvatar] = useState<string>("");

  const submit = async () => {
    await null;
  };

  return <PermissionUI avatar={avatar} setAvatar={setAvatar} submit={submit} />;
};

export default Permissions;
