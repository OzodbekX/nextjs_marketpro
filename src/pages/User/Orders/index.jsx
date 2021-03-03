import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Order from "../../../components/Order";
import {
  selectUserAccessToken,
  selectUserData,
  selectUserOrdersHistory,
} from "../../../redux/selectors/user";
import { getUserOrdersHistoryAndAddressesAndPickUpPointsStart } from "../../../redux/modules/user/action";

const OrdersPage = ({
  orders,
  getUserOrdersHistoryAndAddressesAndPickUpPointsStart,
  user,
  token,
}) => {
  useEffect(() => {
    if (user && token) {
      getUserOrdersHistoryAndAddressesAndPickUpPointsStart(user.id, token);
    }
  }, []);

  return (
    <div>
      <Order orders={orders} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orders: selectUserOrdersHistory,
  user: selectUserData,
  token: selectUserAccessToken,
});

const mapDispatchToProps = (dispatch) => ({
  getUserOrdersHistoryAndAddressesAndPickUpPointsStart: (userId, token) =>
    dispatch(
      getUserOrdersHistoryAndAddressesAndPickUpPointsStart(userId, token)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
