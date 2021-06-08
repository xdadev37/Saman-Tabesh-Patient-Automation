import { FC, useState } from "react";
import PermissionUI from "../../../UI/PermissionsUI";

const Permissions: FC = () => {
  const [avatar, setAvatar] = useState<Blob | string>("");

  const submit = async () => {
    await null;
  };

  return <PermissionUI setAvatar={setAvatar} submit={submit} />;
};

export default Permissions;
