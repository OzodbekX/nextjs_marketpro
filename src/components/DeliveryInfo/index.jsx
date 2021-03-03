import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartProducts } from "../../redux/selectors/cart";
import { base_url, common } from "../../constants";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  selectUserPickUpPoints,
  selectUserLanguage,
} from "../../redux/selectors/user";
import { useRouter } from "next/router";
import { setSelectedDeliveryInfo } from "../../redux/modules/user/action";
import { makeFirstCapital } from "../../utils";
import { strings } from "../../locales/strings";

const DeliveryInfo = ({
  setDeliveryInfo,
  setPayment,
  cartProducts,
  pickUpPoints,
  setSelectedDeliveryInfo,
  language,
}) => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);

  const md = useMediaQuery(768);
  const router = useRouter();

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <div className="w-3/4 m-auto flex flex-col my-10 bg-gray-100 rounded p-10">
      <h1 className="mb-8 font-bold pb-2 text-gray-600 border-b-2 border-gray-300">
        {`${common.companyName}Ecommerce ${makeFirstCapital(strings.products)}`}
      </h1>

      <div className={`flex flex-col border-b-2 border-gray-300 pb-2`}>
        {cartProducts.map((product) => (
          <div className={"flex flex-row justify-between"}>
            <div className={`${!md ? "flex-row" : "flex-col"} flex mb-6`}>
              <img
                className="w-20 h-20 mr-4 "
                src={`${base_url}${product.thumbnailImage}`}
                alt=""
              />
              <p className={`text-gray-500 ${md && "pt-4"}`}>
                {product.name}{" "}
                {product.variant &&
                  product.variant.variant.split("-").join(" ")}
              </p>
            </div>
            <div
              className={
                "flex flex-row justify-between items-center mr-8 font-medium text-base"
              }
            >
              <div className={"px-4"}>
                {makeFirstCapital(strings.quantity)}: {product.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`${
          !md ? "flex-row" : "flex-col"
        } flex w-full my-4 justify-between mt-4 border-b-2 border-gray-300 pb-4`}
      >
        <h1 className={`font-bold text-gray-600 ${md && "pb-4"}`}>
          {makeFirstCapital(strings.chooseDeliveryType)}
        </h1>

        <div className="flex flex-col w-1/3 justify-between">
          <div className="flex w-full justify-between ">
            <label
              onClick={() => {
                setSelectedDeliveryInfo({
                  shippingType: { type: "home_delivery", value: null },
                });
                setSelected1(true);
                setSelected2(false);
              }}
              className={`${
                selected1 && "border-red-400"
              } flex py-4 font-semibold cursor-pointer items-center p-2 bg-white border-2 border-gray-300 rounded transition duration-500 ease-in-out`}
            >
              <input type="checkbox" checked={selected1} />
              <h1 className="ml-2">{makeFirstCapital(strings.homeDelivery)}</h1>
            </label>{" "}
            <label
              onClick={() => {
                setSelected2(true);
                setSelected1(false);
              }}
              className={`${
                selected2 && "border-red-400"
              }  flex items-center py-4 font-semibold cursor-pointer p-2 bg-white border-2 border-gray-300 rounded transition duration-500 ease-in-out`}
            >
              <input type="checkbox" checked={selected2} />
              <h1 className="ml-2">{makeFirstCapital(strings.localPickup)}</h1>
            </label>
          </div>
          {selected2 && (
            <div className="mt-4">
              <input
                placeholder={"Select your nearest pickup point"}
                className="focus:outline-none w-full cursor-pointer p-2 rounded border-2 border-gray-300 focus:border-red-400"
                type="text"
                list={"items"}
              />
              <datalist style={{ backgroundColor: "white" }} id={"items"}>
                {pickUpPoints.map((point) => (
                  <option value={point} />
                ))}
              </datalist>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full justify-between">
        <button
          onClick={() => router.push("/")}
          className="text-blue-500 font-semibold"
        >
          &#8592; {makeFirstCapital(strings.backToShop)}
        </button>
        <button
          disabled={selected1 === false && selected2 === false}
          onClick={() => {
            setDeliveryInfo(false);
            setPayment(true);
          }}
          className={`${
            selected1 === false && selected2 === false
              ? "opacity-25 cursor-default"
              : ""
          } w-48 ${
            !md ? "h-12" : "h-18"
          } p-2 ml-4 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 focus:outline-none`}
        >
          {makeFirstCapital(strings.continueToPayment)}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartProducts: selectCartProducts,
  pickUpPoints: selectUserPickUpPoints,
  language: selectUserLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedDeliveryInfo: (data) => dispatch(setSelectedDeliveryInfo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInfo);
