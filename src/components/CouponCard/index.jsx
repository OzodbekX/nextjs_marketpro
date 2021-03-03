import React from "react";

import {
  CouponCard,
  CouponTitle,
  CouponImage,
  CouponInfo,
  CouponApply,
  CouponDivider,
} from "./style";

const CouponCard = ({ coupon }) => {
  return (
    <CouponCard>
      <CouponTitle url={coupon.title_background}>
        <h1>{coupon.title}</h1>
        <p>{coupon.sale}</p>
      </CouponTitle>
      <CouponImage>
        {coupon.images.map((img, index) => {
          return <img src={img.image} key={index} alt="" />;
        })}
      </CouponImage>
      <CouponInfo>
        <p> {coupon.date} </p>
        <h1>{coupon.promocode}</h1>
      </CouponInfo>
      <CouponDivider />
      <CouponApply>
        <button className="px-8 py-4 text-blue-700 font-bold">
          {coupon.apply}
        </button>
      </CouponApply>
    </CouponCard>
  );
};

export default CouponCard;
