import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import {
  selectCartProducts,
  selectCartProductsCount,
  selectCartProductsNewTotal,
} from "../../redux/selectors/cart";
import { selectUserLanguage } from "../../redux/selectors/user";
import { clearCart } from "../../redux/modules/cart/action";
import { makeFirstCapital, normalizePrice } from "../../utils";
import { strings } from "../../locales/strings";
import { selectSelectedCurrency } from "../../redux/selectors/app";

const Confirmation = ({
  cartProductsQuantity,
  cartProducts,
  total,
  clearCart,
  language,
  selectedCurrency,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <div>
      <div className={"w-1/2 px-10 py-10 m-auto my-10 bg-gray-100 rounded"}>
        <h1 className="text-center  text-lg text-green-400 font-bold">
          {makeFirstCapital(strings.yourOrderSuccessFullyAccepted)}
        </h1>
        <div className="text-sm bg-gray-100 mt-5">
          <div className="flex w-full justify-between text-gray-600 border-b-2 border-gray-300 mb-1">
            <h1 className={"text-lg font-bold"}>
              {makeFirstCapital(strings.summary)}
            </h1>
            <h1
              className={"bg-customBlue1 text-xs text-white rounded py-1 px-2"}
            >
              {`${cartProductsQuantity} ${strings.piece}`}
            </h1>
          </div>

          <div className="table w-full my-4">
            <div className={"table-row-group"}>
              <div className="table-row font-bold">
                <h1 className={"table-cell w-3/4"}>
                  {makeFirstCapital(strings.product1)}
                </h1>
                <h1 className={"table-cell w-1/8"}>
                  {makeFirstCapital(strings.quantity)}
                </h1>
                <h1 className={"table-cell w-1/8"}>
                  {makeFirstCapital(strings.total)}
                </h1>
              </div>
              <div className={"table-row"}>
                <div className={"table-cell border-b-2 border-gray-200"} />
                <div className={"table-cell border-b-2 border-gray-200"} />
                <div className={"table-cell border-b-2 border-gray-200"} />
              </div>
              {cartProducts.map((cartProduct) => (
                <div className={`table-row`}>
                  <p className={"table-cell"}>
                    {cartProduct.name}{" "}
                    {cartProduct.variant &&
                      cartProduct.variant.variant.split("-").join(" ")}
                  </p>
                  <p className={"table-cell"}>×{cartProduct.quantity}</p>
                  <p className={"table-cell"}>
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
                  <div className={"h-6"} />
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
                <h1 className={"table-cell"}>
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
        <div
          onClick={() => {
            router.push(`/`);
            clearCart();
          }}
          className="flex"
        >
          <button className="ml-auto outline-none border-2 px-4 mt-2 py-2 bg-customBlue1 text-white rounded">
            {makeFirstCapital(strings.main)}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartProductsQuantity: selectCartProductsCount,
  cartProducts: selectCartProducts,
  total: selectCartProductsNewTotal,
  language: selectUserLanguage,
  selectedCurrency: selectSelectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
