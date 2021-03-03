import React, { useEffect } from "react";
import { connect } from "react-redux";
import { strings } from "../../locales/strings";
import { common } from "../../constants";
import { makeFirstCapital } from "../../utils";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { createStructuredSelector } from "reselect";
import {
  selectCartProducts,
  selectCartProductsCount,
  selectCartProductsNewTotal,
  selectCartProductsOldTotal,
} from "../../redux/selectors/cart";
import { selectUserLanguage } from "../../redux/selectors/user";
import {
  clearCart,
  getCartProductsFromLocalStorageStart,
} from "../../redux/modules/cart/action";
import { updateProductStatus } from "../../redux/modules/product/actions";
import Checkout from "../../components/Checkout";
import ProductCard from "../../components/ProductCard";

const CartPage = ({
  products,
  clear,
  count,
  language,
  oldTotal,
  newTotal,
  updateStatus,
  getCartProductsFromLocalStorageStart,
}) => {
  const md = useMediaQuery(768);

  useEffect(() => {
    getCartProductsFromLocalStorageStart();
  }, []);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <div className="my-20">
      <div className="flex flex-row mb-8">
        <h3 className="text-5xl">{makeFirstCapital(strings.cart)}</h3>
        <span className="rounded-md text-black-500 font-bold text-center bg-grey-200 w-5 h-6">
          {count}
        </span>
      </div>
      <div
        className={`${
          !md ? "flex-row" : "flex-col items-center"
        } flex justify-between`}
      >
        <div className={`${!md ? "w-2/3" : "w-11/12"}`}>
          <div
            className={
              "bg-gray-200 font-medium flex py-4 px-12 flex-row justify-between text-black-300 border-b-4 border-white"
            }
          >
            <p className="cursor-pointer hover:text-blue-700">
              {makeFirstCapital(`${strings.delivery} ${common.companyName}`)}
            </p>
            {count !== 0 && (
              <div
                className={
                  "cursor-pointer text-red-600 ml-4 hover:text-red-800"
                }
                onClick={() => {
                  clear();
                  products.map((product) => {
                    updateStatus(product.variant.id, false);
                  });
                }}
              >
                {makeFirstCapital(strings.removeAll)}
              </div>
            )}
          </div>
          {count === 0 && (
            <div className={"bg-gray-100 py-10"}>
              <h1 className="text-center text-2xl font-semibold">
                {makeFirstCapital(strings.emptyCart)}
              </h1>
              <p className="text-center mt-1">
                {makeFirstCapital(strings.plsChooseGoods)}
              </p>
            </div>
          )}
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
        <div className={`${!md ? "w-1/3 ml-4" : "w-11/12 mt-10"}`}>
          <Checkout
            count={count}
            oldTotal={oldTotal}
            newTotal={newTotal}
            totalWeight={"12 kg"}
          />
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  products: selectCartProducts,
  count: selectCartProductsCount,
  oldTotal: selectCartProductsOldTotal,
  newTotal: selectCartProductsNewTotal,
  language: selectUserLanguage,
});

const mapDispatchToProps = (dispatch) => ({
  clear: () => dispatch(clearCart()),
  updateStatus: (productVariantId, boolean) =>
    dispatch(updateProductStatus(productVariantId, boolean)),
  getCartProductsFromLocalStorageStart: () =>
    dispatch(getCartProductsFromLocalStorageStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
