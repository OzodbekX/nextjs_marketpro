import React from "react";
import LayoutContainerUser from "../../src/containers/LayoutContainerUser";
import WishlistPage from "../../src/pages/User/Wishlist";

const UserWishlistRoute = () => {
  return (
    <LayoutContainerUser>
      <WishlistPage />
    </LayoutContainerUser>
  );
};

export default UserWishlistRoute;
