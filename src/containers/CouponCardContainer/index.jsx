import React from "react";
import CouponCard from "../../components/CouponCard";

const CouponCardContainer = ({ coupons }) => {
  return (
    <>
      {coupons.map((coupon, index) => (
        <CouponCard coupon={coupon} key={index} />
      ))}
    </>
  );
};

export default CouponCardContainer;
