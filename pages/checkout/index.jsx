import React from "react";
import LayoutContainer from "../../src/containers/LayoutContainer";
import OrderPage from "../../src/pages/Checkout";

const CheckoutRoute = () => {
  return (
    <LayoutContainer>
      <OrderPage />
    </LayoutContainer>
  );
};

export default CheckoutRoute;
