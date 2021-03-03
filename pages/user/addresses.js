import React from "react";
import LayoutContainerUser from "../../src/containers/LayoutContainerUser";
import UserAddressesPage from "../../src/pages/User/Addresses";

const UserAddressesRoute = () => {
  return (
    <LayoutContainerUser>
      <UserAddressesPage />
    </LayoutContainerUser>
  );
};

export default UserAddressesRoute;
