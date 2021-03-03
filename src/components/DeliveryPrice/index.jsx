import Link from "next/link";
import { MdAddAlert } from "react-icons/md";
import { connect } from "react-redux";
import DeliveryType from "../../components/DeliverType/index";
import { strings } from "../../locales/strings";
import { addToCart } from "../../redux/modules/cart/action";
import { updateProductStatus } from "../../redux/modules/product/actions";
import { makeFirstCapital, normalizePrice } from "../../utils";
import { createStructuredSelector } from "reselect";
import { selectSelectedVariant } from "../../redux/selectors/product";
import { selectCartProducts } from "../../redux/selectors/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { selectUserLanguage } from "../../redux/selectors/user";

const DeliveryPrice = ({
  product,
  addCart,
  updateStatus,
  selectedVariant,
  cartProducts,
  language,
}) => {
  const router = useRouter();

  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  useEffect(() => {
    if (cartProducts.length !== 0) {
      const existingProduct = cartProducts.find(
        (cartProduct) => cartProduct.variant.id === selectedVariant.id
      );

      if (existingProduct) {
        setInCart(true);
        setQuantity(existingProduct.quantity);
      } else {
        setInCart(false);
        setQuantity(null);
      }
    }
  }, [cartProducts, selectedVariant]);

  return (
    <div className={"flex flex-col"}>
      <div className="flex flex-col w-84 bg-yellow py-4 px-5 relative rounded border border-customGreyText lg:ml-4">
        <div
          className="rounded absolute top-1 right-1 p-1 cursor-pointer"
          style={{ background: "#E5EFFF" }}
        >
          <p className="text-xs text-blue-500">
            {makeFirstCapital(strings.foundCheaper)}
          </p>
        </div>
        <div className="flex flex-row items-end">
          <strong
            className="mr-4"
            style={{
              fontSize: "30px",
              color: `${
                product.price_higher &&
                selectedVariant.price &&
                selectedVariant.price.toFixed(0) !==
                  product.price_higher.toFixed(0)
                  ? "#f91155"
                  : "black"
              }`,
            }}
          >
            {normalizePrice(
              selectedVariant.price && selectedVariant.price.toFixed(0)
            )}
          </strong>
          <strong
            className={
              product.price_higher &&
              selectedVariant.price &&
              selectedVariant.price.toFixed(0) !==
                product.price_higher.toFixed(0)
                ? "text-black line-through mb-1"
                : "hidden"
            }
            style={{
              textDecorationColor: "#F91155",
              fontSize: "20px",
            }}
          >
            {normalizePrice(
              product.price_higher && product.price_higher.toFixed(0)
            )}
          </strong>
        </div>
        <Link href="/">
          <a className="text-sm text-blue-600 mt-3 py-3">
            {makeFirstCapital(strings.bestPrices)}
          </a>
        </Link>
        <Link href="/">
          <a className="flex flex-row text-blue-500 items-center py-3 text-sm hover:text-blue-700">
            <MdAddAlert className="mr-1 text-xl" />
            {makeFirstCapital(strings.declinePrices)}
          </a>
        </Link>
        <div
          onClick={() => {
            updateStatus(selectedVariant.id, true);
            addCart({
              id: product.id,
              thumbnailImage: product.thumbnail_image,
              name: product.name,
              discount: product.discount,
              discountType: product.discount_type,
              basePrice: product.price_higher,
              baseDiscountedPrice: product.price_lower,
              links: product.links,
              variant: Object.keys(selectedVariant).length
                ? selectedVariant
                : product.variations[0],
              slug: product.slug,
            });
          }}
          className={`mt-3 text-white text-xl rounded py-4 px-5 ${
            inCart
              ? "hidden"
              : "bg-customBlue1 bg-customDarkBlue2-hover cursor-pointer text-center"
          }`}
        >
          {makeFirstCapital(strings.addToCart)}
        </div>
        <div
          className={`${
            inCart
              ? "flex flex-row mt-4 w-full text-center text-white font-bold cursor-pointer"
              : "hidden"
          }`}
        >
          {quantity && (
            <div
              className={"w-2/3 bg-customGreen py-2 text-sm"}
              style={{
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
              }}
              onClick={() => router.push("/cart")}
            >
              {makeFirstCapital(strings.allreadyInCart)} {quantity}{" "}
              {strings.piece}
              <br />
              {makeFirstCapital(strings.goToCheckout)}
            </div>
          )}
          <div
            className={"w-1/3 bg-customBlue1 py-2 text-3xl"}
            style={{
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
            onClick={() => {
              addCart({
                id: product.id,
                thumbnailImage: product.thumbnail_image,
                name: product.name,
                discount: product.discount,
                discountType: product.discount_type,
                basePrice: product.price_higher,
                baseDiscountedPrice: product.price_lower,
                links: product.links,
                variant: Object.keys(selectedVariant).length
                  ? selectedVariant
                  : product.variations[0],
                slug: product.slug,
              });
            }}
          >
            &#43;
          </div>
        </div>
      </div>
      <div>
        <div className={"w-84 py-4 px-5 mt-4"}>
          <DeliveryType product={product} selectedVariant={selectedVariant} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedVariant: selectSelectedVariant,
  cartProducts: selectCartProducts,
  language: selectUserLanguage,
});
const mapDispatchToProps = (dispatch) => ({
  addCart: (product) => dispatch(addToCart(product)),
  updateStatus: (productId) => dispatch(updateProductStatus(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryPrice);
