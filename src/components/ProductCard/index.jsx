import {
  addToCart,
  clearItemFromCart,
  removeFromCart,
} from "../../redux/modules/cart/action";
import { connect } from "react-redux";

import { makeFirstCapital, normalizePrice } from "../../utils";

import { strings } from "../../locales/strings";
import { base_url } from "../../constants";
import { useRouter } from "next/router";
import { updateProductStatus } from "../../redux/modules/product/actions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/modules/user/action";
import { createStructuredSelector } from "reselect";
import {
  selectUserAccessToken,
  selectUserData,
  selectUserLoggedOut,
  selectUserWishlist,
  selectUserLanguage,
} from "../../redux/selectors/user";
import { useEffect, useState } from "react";
import { setActionStatus } from "../../redux/modules/app/actions";
import { selectSelectedCurrency } from "../../redux/selectors/app";

const ProductCard = ({
  product,
  addProduct,
  removeProduct,
  clearCartFromCart,
  updateStatus,
  user,
  token,
  isLoggedOut,
  addToWishlist,
  removeFromWishlist,
  wishlist,
  setActionStatus,
  language,
  selectedCurrency,
}) => {
  const router = useRouter();
  const [wished, setWished] = useState(false);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  useEffect(() => {
    if (wishlist && wishlist.length) {
      wishlist.map((wishProduct) => {
        if (
          (wishProduct && wishProduct.product_id === product.id) ||
          (wishProduct && wishProduct.product_id === product.product_id)
        ) {
          setWished(true);
        }
      });
    }
  }, [wishlist]);

  return (
    <div className={"border-b-2 border-white bg-customGrey py-2"}>
      <div className="flex flex-row justify-around">
        <div
          className={"cursor-pointer"}
          style={{ width: "92px", height: "92px" }}
          onClick={() => router.push(`/product/${product.slug}`)}
        >
          <img
            style={{ width: "92px", height: "92px" }}
            src={`${base_url}${product.thumbnailImage}`}
            alt=""
          />
        </div>
        <div
          className="flex flex-row justify-between pt-2"
          style={{ width: "70%" }}
        >
          <div className="w-1/2 flex flex-col justify-between">
            <p className="text-sm">
              {product.name}{" "}
              {product.variant.variant &&
                product.variant.variant.split("-").join(" ")}
            </p>
            {product.discountType === "percent" && product.discount !== 0 && (
              <p className="text-gray-500 text-xs font-medium">
                {product.discount} %
              </p>
            )}
            <span className={`flex flex-row items-center`}>
              {!isLoggedOut && (
                <button
                  onClick={() => {
                    if (!wished) {
                      addToWishlist(user.id, product.id, token);
                      setActionStatus(strings.addedToWishlist, "success");
                      setWished(true);
                    } else if (wished) {
                      wishlist.map((wishProduct) => {
                        if (
                          wishProduct.product_id === product.id ||
                          wishProduct.product_id === product.product_id
                        ) {
                          removeFromWishlist(user.id, wishProduct.id, token);
                          setActionStatus(
                            strings.removedFromWishlist,
                            "success"
                          );
                        }
                      });
                      setWished(false);
                    }
                  }}
                  className="mr-3 text-xs text-blue-500 font-medium"
                >
                  {!wished
                    ? makeFirstCapital(strings.inFavorites)
                    : makeFirstCapital(strings.removeFromFavorites)}
                </button>
              )}
              <span className="text-sm text-gray-400 font-medium">|</span>
              <button
                className="text-xs ml-3 text-blue-500 font-medium"
                onClick={() => {
                  clearCartFromCart(product.variant.id);
                  updateStatus(product.variant.id, false);
                }}
              >
                {makeFirstCapital(strings.remove)}
              </button>
            </span>
          </div>
          <div
            style={{ width: "20%" }}
            className={"flex flex-col justify-around font-bold"}
          >
            <span>
              {selectedCurrency.symbol}{" "}
              {normalizePrice(
                (
                  (
                    product.variant.price * selectedCurrency.exchange_rate
                  ).toFixed(0) * product.quantity
                ).toString()
              )}
            </span>
            <div
              style={{ margin: "0" }}
              className={
                product.variant.price !== product.basePrice
                  ? "flex flex-col items-start"
                  : "hidden"
              }
            >
              <span className="mr-2 pb-2 text-gray-400 text-xs line-through">
                {selectedCurrency.symbol}{" "}
                {normalizePrice(
                  (
                    (
                      product.basePrice * selectedCurrency.exchange_rate
                    ).toFixed(0) * product.quantity
                  )
                    .toFixed(0)
                    .toString()
                )}
              </span>
              {product.variant.price !== product.basePrice && (
                <span className="text-pink-500 text-sm">
                  {makeFirstCapital(strings.discount)} {selectedCurrency.symbol}{" "}
                  {normalizePrice(
                    (
                      (
                        (product.basePrice - product.variant.price) *
                        selectedCurrency.exchange_rate
                      ).toFixed(0) * product.quantity
                    ).toString()
                  )}
                </span>
              )}
            </div>
          </div>
          <div
            className={
              "flex flex-row justify-between items-center mr-8 font-medium text-base"
            }
          >
            <div
              className={"cursor-pointer"}
              onClick={() => {
                removeProduct(product.variant.id);
                if (product.quantity === 1) {
                  updateStatus(product.variant.id, false);
                }
              }}
            >
              &#10094;
            </div>
            <div className={"px-4"}>{product.quantity}</div>
            <div
              className={"cursor-pointer"}
              onClick={() => {
                addProduct(product);
              }}
            >
              &#10095;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectUserData,
  token: selectUserAccessToken,
  isLoggedOut: selectUserLoggedOut,
  wishlist: selectUserWishlist,
  language: selectUserLanguage,
  selectedCurrency: selectSelectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (product) => dispatch(addToCart(product)),
  removeProduct: (productVariantId) =>
    dispatch(removeFromCart(productVariantId)),
  clearCartFromCart: (productId) => dispatch(clearItemFromCart(productId)),
  updateStatus: (productId, boolean) =>
    dispatch(updateProductStatus(productId, boolean)),
  addToWishlist: (userId, productId, token) =>
    dispatch(addToWishlist(userId, productId, token)),
  removeFromWishlist: (userId, productId, token) =>
    dispatch(removeFromWishlist(userId, productId, token)),
  setActionStatus: (message, type) => dispatch(setActionStatus(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
