import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { paymentMethodsConstants } from "../../constants";
import { createStructuredSelector } from "reselect";
import {
  selectDeliveryInfo,
  selectUserData,
  selectUserPaymentMethods,
  selectUserLanguage,
} from "../../redux/selectors/user";
import {
  selectCartProducts,
  selectCartProductsCount,
  selectCartProductsNewTotal,
} from "../../redux/selectors/cart";
import {
  checkoutOrdersStart,
  setSelectedDeliveryInfo,
} from "../../redux/modules/user/action";
import { updateProductStatus } from "../../redux/modules/product/actions";
import { makeFirstCapital, normalizePrice } from "../../utils";
import { strings } from "../../locales/strings";
import { selectSelectedCurrency } from "../../redux/selectors/app";

const Payment = ({
  setPayment,
  setConfirmation,
  paymentMethods,
  cartProductsQuantity,
  cartProducts,
  total,
  setSelectedDeliveryInfo,
  checkoutOrderStart,
  user,
  deliveryInfo,
  updateProductStatus,
  language,
  selectedCurrency,
}) => {
  const [selected, setSelected] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <div className="">
      <div className="w-3/4 m-auto flex  my-10">
        <div className={"bg-gray-100 m-auto w-1/2 mr-5 rounded py-4 px-6"}>
          <h1 className="mb-8 font-bold pb-2 text-gray-600 border-b-2 border-gray-300">
            {makeFirstCapital(strings.selectPaymentOption)}
          </h1>
          <div className="flex flex-wrap">
            {paymentMethods.map((method) => (
              <div
                onClick={() => {
                  setSelectedDeliveryInfo({
                    paymentType: method.type,
                  });
                  setSelected(true);
                }}
                className={`${
                  selected && "border-2 border-red-400"
                } flex flex-col items-center justify-between border-2 w-40 h-32 p-2 cursor-pointer rounded border-gray-200`}
              >
                <img className="w-40 h-20" src={method.image} alt="" />
                <h1>{paymentMethodsConstants[method.name]}</h1>
              </div>
            ))}
          </div>
        </div>
        <div className={"w-1/2 px-10  bg-gray-100 rounded"}>
          <div className="text-sm  bg-gray-100 mt-5">
            <div className="flex  w-full justify-between text-gray-600 border-b-2 border-gray-300 mb-1">
              <h1 className={"text-lg font-bold"}>
                {makeFirstCapital(strings.summary)}
              </h1>
              <h1
                className={
                  "bg-customBlue1 text-xs text-white rounded py-1 px-2"
                }
              >
                {`${cartProductsQuantity} ${strings.piece}`}
              </h1>
            </div>

            <div className="table w-full my-4">
              <div className={"table-row-group"}>
                <div className="table-row font-bold">
                  <h1 className={"table-cell w-2/3"}>
                    {makeFirstCapital(strings.product1)}
                  </h1>
                  <h1 className={"table-cell w-1/8"}>
                    {makeFirstCapital(strings.quantity)}
                  </h1>
                  <h1 className={"table-cell w-1/4 pl-2"}>
                    {makeFirstCapital(strings.total)}
                  </h1>
                </div>
                <div className={"table-row"}>
                  <div className={"table-cell border-b-2 border-gray-200"} />
                  <div className={"table-cell border-b-2 border-gray-200"} />
                  <div className={"table-cell border-b-2 border-gray-200"} />
                </div>
                <div className={"h-2"} />
                {cartProducts.map((cartProduct) => (
                  <div className={`table-row`}>
                    <p className={"table-cell"}>
                      {cartProduct.name}{" "}
                      {cartProduct.variant &&
                        cartProduct.variant.variant.split("-").join(" ")}
                    </p>
                    <p className={"table-cell"}>×{cartProduct.quantity}</p>
                    <p className={"table-cell pl-2"}>
                      {selectedCurrency.symbol}{" "}
                      {normalizePrice(
                        (
                          cartProduct.quantity *
                          cartProduct.variant.price *
                          selectedCurrency.exchange_rate
                        )
                          .toFixed(0)
                          .toString()
                      )}
                    </p>
                    <div className={"h-5"} />
                  </div>
                ))}
                <div className={"h-4"} />
                <div className={"table-row"}>
                  <div className={"table-cell border-b-2 border-gray-200"} />
                  <div className={"table-cell border-b-2 border-gray-200"} />
                  <div className={"table-cell border-b-2 border-gray-200"} />
                </div>
                <div className={"h-4"} />
                <div className="table-row">
                  <div />
                  <p className={"table-cell"}>×{cartProductsQuantity}</p>
                  <h1 className={"table-cell pl-2"}>
                    {selectedCurrency.symbol}{" "}
                    {normalizePrice(
                      (total * selectedCurrency.exchange_rate)
                        .toFixed(0)
                        .toString()
                    )}
                  </h1>
                </div>
              </div>
            </div>
            {/*<div className="flex w-full justify-between border-b-2 border-gray-200 mb-4">*/}
            {/*  <h1>Subtotal</h1>*/}
            {/*  <h1>{total}</h1>*/}
            {/*</div>*/}
            {/*<div className="flex w-full justify-between border-b-2 border-gray-200 mb-4">*/}
            {/*  <h1>Налог</h1>*/}
            {/*  <h1>0,000$</h1>*/}
            {/*</div>*/}
            {/*<div className="flex w-full justify-between border-b-2 border-gray-200 mb-4">*/}
            {/*  <h1>Total Shipping</h1>*/}
            {/*  <h1>0,000$</h1>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
      <div className="m-auto w-3/4 flex mb-8 justify-between">
        <button
          onClick={() => router.push("/")}
          className="text-blue-500 font-semibold"
        >
          &#8592; {makeFirstCapital(strings.backToShop)}
        </button>
        <button
          disabled={!selected}
          className={`${
            selected === false && "opacity-25 cursor-default"
          } px-4 py-2 ml-4 bg-blue-700 text-white font-bold rounded hover:bg-blue-800 focus:outline-none`}
          onClick={() => {
            checkoutOrderStart({
              userId: user.id,
              cartProducts: cartProducts.map((product) => {
                localStorage.removeItem(`${product.variant.id}`);
                updateProductStatus(product.id, false);
                return {
                  id: product.id,
                  price: product.baseDiscountedPrice
                    ? product.baseDiscountedPrice
                    : product.basePrice,
                  tax: 0,
                  shipping: 0,
                  variation: product.variant.variant,
                  quantity: product.quantity,
                };
              }),
              ...deliveryInfo,
            });
            setPayment(false);
            setConfirmation(true);
          }}
        >
          {makeFirstCapital(strings.continue)}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  paymentMethods: selectUserPaymentMethods,
  cartProductsQuantity: selectCartProductsCount,
  cartProducts: selectCartProducts,
  total: selectCartProductsNewTotal,
  user: selectUserData,
  deliveryInfo: selectDeliveryInfo,
  language: selectUserLanguage,
  selectedCurrency: selectSelectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedDeliveryInfo: (data) => dispatch(setSelectedDeliveryInfo(data)),
  checkoutOrderStart: (data) => dispatch(checkoutOrdersStart(data)),
  updateProductStatus: (productId, boolean) =>
    dispatch(updateProductStatus(productId, boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
