import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  calculateSalePercent,
  makeFirstCapital,
  normalizePrice,
} from "../../utils";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import TextTruncate from "react-text-truncate";
import { base_url, productTags } from "../../constants";
import { addToCart, clearItemFromCart } from "../../redux/modules/cart/action";
import { updateProductStatus } from "../../redux/modules/product/actions";
import RatingStars from "react-rating-stars-component";
import { useRouter } from "next/router";

import { strings } from "../../locales/strings";
import { createStructuredSelector } from "reselect";
import {
  selectUserAccessToken,
  selectUserData,
  selectUserLoggedOut,
  selectUserLanguage,
  selectUserWishlist,
} from "../../redux/selectors/user";
import {
  addToWishlist,
  handleModal,
  removeFromWishlist,
} from "../../redux/modules/user/action";
import { setActionStatus } from "../../redux/modules/app/actions";
import { selectSelectedCurrency } from "../../redux/selectors/app";

const Card = ({
  wishlist,
  product,
  selectedTag,
  size,
  addCart,
  hasRating,
  updateStatus,
  clearItemFromCart,
  loggedOut,
  user,
  addToWishlist,
  removeFromWishlist,
  token,
  setActionStatus,
  hasBtn,
  language,
  handleModal,
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
        if (wishProduct) {
          if (
            (wishProduct && wishProduct.product_id === product.id) ||
            wishProduct.product_id === product.product_id
          ) {
            setWished(true);
          }
        }
      });
    }
  }, [wishlist]);

  return (
    <div
      className={`cursor-pointer relative m-auto w-full  h-full flex flex-col justify-between z-5 py-2 ${
        size === "2xs"
          ? "w-28 text-xs"
          : size === "xs"
          ? "w-32 h-72 text-xs"
          : size === "sm"
          ? "w-36 h-72 text-xs"
          : size === "base"
          ? "w-44 text-sm"
          : size === "lg"
          ? "w-58 h-80 text-sm"
          : size === "xl"
          ? "w-72 h-80 text-base"
          : size === "2xl"
          ? "w-80 h-80 text-base"
          : size === "3xl"
          ? "w-96 text-base"
          : ""
      }`}
    >
      <div
        // className={"absolute -right-10 top-5 p-1 rounded-full"}
        className="absolute right-0 top-0"
        onClick={() => {
          if (!loggedOut) {
            if (wished) {
              wishlist.map((wishProduct) => {
                if (wishProduct) {
                  if (
                    wishProduct.product_id === product.id ||
                    wishProduct.product_id === product.product_id
                  ) {
                    removeFromWishlist(user.id, wishProduct.id, token);
                    setActionStatus(strings.removedFromWishlist, "success");
                  }
                }
              });
            } else {
              addToWishlist(user.id, product.id, token);
              setActionStatus(strings.addedToWishlist, "success");
            }
            setWished(!wished);
          } else {
            handleModal(1);
          }
        }}
      >
        {!wished ? (
          <AiOutlineHeart color={`#555`} size={24} />
        ) : (
          <AiFillHeart color={`#f00`} size={24} />
        )}
      </div>
      <div
        className={"cover-1 flex flex-col justify-between"}
        onClick={() => router.push(`/product/${product.slug}`)}
      >
        <div>
          <div className={"my-2"}>
            <div
              className={`m-auto ${
                size === "2xs"
                  ? "w-28 h-28"
                  : size === "xs"
                  ? "w-32 h-32"
                  : size === "sm"
                  ? "w-36 h-36"
                  : size === "base"
                  ? "w-44 h-44"
                  : size === "lg"
                  ? "w-48 h-48"
                  : size === "xl"
                  ? "w-56 h-56"
                  : size === "2xl"
                  ? "w-72 h-72"
                  : size === "3xl"
                  ? "w-80 h-80"
                  : ""
              }`}
            >
              <img
                className="w-auto h-full m-auto"
                src={`${base_url}${product.thumbnail_image}`}
                alt={product.name.split("|", 1)}
              />
            </div>
            {product.base_discounted_price !== product.base_price && (
              <p
                className={
                  "absolute -mt-5 bg-customPink z-10 py-1 px-4 text-white font-extrabold rounded"
                }
              >
                -{" "}
                {calculateSalePercent(
                  product.base_price,
                  product.base_discounted_price
                )}
                %
              </p>
            )}
          </div>
          <div className={"pb-1 tracking-tight font-medium"}>
            <p
              className={`
            ${selectedTag === "bestseller" && "text-customOrange"}
            ${selectedTag === "free_delivery" && "text-customBlue1"}
            ${selectedTag === "super_offer" && "text-customViolet"}
            ${selectedTag === "popular" && "text-customOrange"}
            `}
            >
              {productTags[selectedTag]}
            </p>
          </div>
          <div className={"flex flex-col items-start font-bold"}>
            <p
              className={`${
                product.base_discounted_price !== product.base_price
                  ? "text-customPink"
                  : "text-black"
              }`}
            >
              {selectedCurrency.symbol}{" "}
              {normalizePrice(
                (product.base_discounted_price * selectedCurrency.exchange_rate)
                  .toFixed(0)
                  .toString()
              )}
            </p>
            {product.base_discounted_price !== product.base_price && (
              <p
                className={"text-black line-through"}
                style={{ textDecorationColor: "red" }}
              >
                {selectedCurrency.symbol}{" "}
                {normalizePrice(
                  (product.base_price * selectedCurrency.exchange_rate)
                    .toFixed(0)
                    .toString()
                )}
              </p>
            )}
          </div>
          <div className={"font-semibold text-sm"}>
            <TextTruncate
              line={2}
              text={`${product.name.split("|")[0]} ${
                product.variant
                  ? product.variant.variant &&
                    product.variant.variant.includes("-")
                    ? product.variant.variant.split("-").join(" ")
                    : product.variant && product.variant.variant
                  : ""
              }`}
              truncateText={"..."}
            />
          </div>
        </div>
      </div>
      <div className="cover-2">
        <div className={"cursor-pointer text-left py-2"}>
          {hasRating && (
            <RatingStars
              count={5}
              size={20}
              value={product.rating}
              edit={false}
            />
          )}
        </div>
        {hasBtn && (
          <div className={"w-full mb-2"}>
            {!product.inCart ? (
              <div
                onClick={() => {
                  addCart({
                    id: product.product_id ? product.product_id : product.id,
                    thumbnailImage: product.thumbnail_image,
                    name: product.name,
                    discount: product.discount,
                    discountType: product.discount_type,
                    basePrice: product.base_price,
                    baseDiscountedPrice: product.base_discounted_price,
                    links: product.links,
                    variant: product.variant,
                    slug: product.slug,
                  });
                  updateStatus(product.variant.id, true);
                  setActionStatus(strings.addedToCart, "success");
                }}
                className="bg-customBlue1 text-center cursor-pointer font-bold text-white inline-block rounded py-2 px-3"
              >
                {makeFirstCapital(strings.toCart)}
              </div>
            ) : (
              <div
                onClick={() => {
                  clearItemFromCart(
                    product.product_id ? product.product_id : product.id
                  );
                  updateStatus(product.variant.id, false);
                  setActionStatus(strings.removedFromCart, "success");
                }}
                className="bg-customGrey cursor-pointer text-center font-bold text-customBlue1 inline-block rounded py-2 px-3"
              >
                {makeFirstCapital(strings.allreadyInCart)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loggedOut: selectUserLoggedOut,
  user: selectUserData,
  token: selectUserAccessToken,
  wishlist: selectUserWishlist,
  language: selectUserLanguage,
  selectedCurrency: selectSelectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  addCart: (product) => dispatch(addToCart(product)),
  clearItemFromCart: (productId) => dispatch(clearItemFromCart(productId)),
  updateStatus: (productId, boolean) =>
    dispatch(updateProductStatus(productId, boolean)),
  addToWishlist: (userId, productId, token) =>
    dispatch(addToWishlist(userId, productId, token)),
  removeFromWishlist: (userId, wishlistId, token) =>
    dispatch(removeFromWishlist(userId, wishlistId, token)),
  setActionStatus: (message, type) => dispatch(setActionStatus(message, type)),
  handleModal: (value) => dispatch(handleModal(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
