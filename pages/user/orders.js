import React from "react";
import LayoutContainerUser from "../../src/containers/LayoutContainerUser";
import OrdersPage from "../../src/pages/User/Orders";

const OrdersRoute = () => {
  return (
    <LayoutContainerUser>
      <OrdersPage />
    </LayoutContainerUser>
  );
};

export default OrdersRoute;
