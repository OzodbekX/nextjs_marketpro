import LayoutContainerUser from "../../src/containers/LayoutContainerUser";
import UserSettingsPage from "../../src/pages/User/Settings";

const UserSettingsRoute = () => {
  return (
    <LayoutContainerUser>
      <UserSettingsPage />
    </LayoutContainerUser>
  );
};

export default UserSettingsRoute;
