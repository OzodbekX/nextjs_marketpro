import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductGallery from "../../components/ProductGallery";
import ProductInfo from "../../components/ProductInfo";
import { connect } from "react-redux";
import { spesifications } from "../../mocks/data";
import DeliveryPrice from "../../components/DeliveryPrice";
import ProductDesc from "../../components/ProductDesc";
import Specification from "../../components/Specification";
import { createStructuredSelector } from "reselect";
import {
  addProductForComparing,
  getProductInfoStart,
  writeCommentToProductStart,
} from "../../redux/modules/product/actions";
import {
  selectComparingProducts,
  selectRelatedProductsOfProduct,
  selectSelectedProductDetails,
} from "../../redux/selectors/product";
import { selectCartProducts } from "../../redux/selectors/cart";
import {
  selectUserAccessToken,
  selectUserData,
  selectUserLanguage,
  selectUserLoggedOut,
  selectUserOrdersHistory,
  selectUserWishlist,
} from "../../redux/selectors/user";
import { useAlert } from "react-alert";
import RatingStars from "react-rating-stars-component";
import { IoIosClose, IoLogoTwitter, IoMdReturnLeft } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { FaFacebook, FaOdnoklassnikiSquare } from "react-icons/fa";
import { CgEnter } from "react-icons/cg";
import { BsHeart } from "react-icons/bs";
import { BiListCheck, BiListPlus } from "react-icons/bi";
import { RiQuestionnaireLine } from "react-icons/ri";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { makeFirstCapital } from "../../utils";
import { strings } from "../../locales/strings";
import CardsContainer from "../../containers/CardsContainer";
import { base_url, common } from "../../constants";
import Switch from "react-switch";
import DefaultModal from "../../components/common/DefaultModal";
import {
  addToWishlist,
  handleModal,
  removeFromWishlist,
} from "../../redux/modules/user/action";
import { setActionStatus } from "../../redux/modules/app/actions";

const ProductPage = ({
  product,
  getProductInfo,
  cartProducts,
  relatedProducts,
  language,
  loggedOut,
  handleModal,
  userOrderHistory,
  user,
  writeCommentToProductStart,
  token,
  wishlist,
  addToWishlist,
  removeFromWishlist,
  setActionStatus,
  addProductForComparing,
  selectedForComparing,
}) => {
  const router = useRouter();
  const alert = useAlert();
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState(true);
  const [question, setQuestion] = useState(false);
  const [anonym, setAnonym] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [writeComment, setWriteComment] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [productComment, setProductComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [error, setError] = useState("");
  const [wished, setWished] = useState(false);
  const [inComparing, setInComparing] = useState(false);

  const [galleryModal, setGalleryModal] = useState(false);

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

  useEffect(() => {
    if (selectedForComparing && selectedForComparing.length && product) {
      let boolean = false;
      selectedForComparing.map((prd) => {
        if (prd.slug === product.slug) {
          boolean = true;
        }
      });

      setInComparing(boolean);
    }
  }, [selectedForComparing, product]);

  useEffect(() => {
    if (router) {
      getProductInfo(router && router.query.id, (errorMessage) => {
        alert.error(errorMessage);
      });
    }
  }, [router.query.id]);

  const lg = useMediaQuery(1024);
  const md = useMediaQuery(768);
  const xsm = useMediaQuery(420);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return product ? (
    <div className={"mt-2"}>
      <div
        className={
          "flex flex-row flex-wrap justify-start items-center mt-8 mb-2"
        }
      >
        {product.breadcrumbs &&
          product.breadcrumbs.map((nav) => (
            <div className={"flex flex-row items-center"}>
              {" "}
              <p
                className={
                  "text-customBlue1 text-xs md:text-base mr-1 md:mr-4 text-customBlue2-hover cursor-pointer"
                }
                onClick={() => router.push(`/category/${nav.slug}`)}
              >
                {nav.name}{" "}
              </p>
              <span className={"text-gray-400 mr-1 md:mr-2 text-xs"}>
                &#10095;
              </span>
            </div>
          ))}
        <p
          className={
            "text-customBlue1 text-xs md:text-base mr-1 md:mr-4 text-customBlue2-hover cursor-pointer"
          }
        >
          {product.name}{" "}
        </p>
      </div>
      <div className="flex flex-wrap mb-2 cursor-pointer">
        {product.tag &&
          product.tag.map((tag) => (
            <span className="mr-4 my-2 text-xs border-2 border-yellow-500 p-2 rounded">
              {tag}
            </span>
          ))}
      </div>
      <h1 className="font-extrabold text-lg">{product.name}</h1>
      <div className="flex flex-wrap items-center pb-2 mb-4 border-b-2 border-gray-300">
        <RatingStars count={5} size={20} value={3} edit={false} />
        <p
          onClick={() =>
            document
              .getElementById("CommentsAndQuestionsContainer")
              .scrollIntoView({
                behavior: "smooth",
                block: "center",
              })
          }
          className="ml-4  text-sm text-blue-400 hover:text-blue-500 cursor-pointer mt-2 md:mt-0"
        >
          {strings.addComment}
        </p>
        <p className="flex text-blue-400 hover:text-blue-500 cursor-pointer items-center ml-4 mt-2 md:mt-0 text-sm">
          <span>
            <RiQuestionnaireLine className="mr-1" />
          </span>
          {strings.addQuestion}
        </p>
        <p
          onClick={() => {
            if (inComparing) {
              router.push("/product/compare");
            } else {
              addProductForComparing(product);
            }
          }}
          className="flex text-blue-400 hover:text-blue-500 cursor-pointer items-center ml-4 mt-2 md:mt-0 text-sm"
        >
          <span>
            {inComparing ? (
              <BiListCheck className={"mr-1"} size={20} />
            ) : (
              <BiListPlus className={"mr-1"} size={20} />
            )}
          </span>
          {inComparing ? strings.goToComparing : strings.addForComparing}
        </p>
        {user && (
          <p
            onClick={() => {
              if (wished) {
                wishlist.map((wishProduct) => {
                  if (
                    wishProduct.product_id === product.id ||
                    wishProduct.product_id === product.product_id
                  ) {
                    removeFromWishlist(user.id, wishProduct.id, token);
                    setActionStatus(strings.removedFromWishlist, "success");
                  }
                });
              } else {
                addToWishlist(user.id, product.id, token);
                setActionStatus(strings.addedToWishlist, "success");
              }

              setWished(!wished);
            }}
            className="flex text-blue-400 hover:text-blue-500 cursor-pointer items-center ml-4 mt-2 md:mt-0 text-sm"
          >
            <span>
              <BsHeart color={`${wished ? "#f00" : "#05f"}`} className="mr-1" />
            </span>
            {!wished
              ? makeFirstCapital(strings.addToFavorite)
              : makeFirstCapital(strings.removeFromWishlist)}
          </p>
        )}
        <div
          onMouseLeave={() => setShow(false)}
          onMouseEnter={() => setShow(true)}
          onClick={() => setShow(!show)}
          className="ml-4 relative flex items-center text-blue-400 hover:text-blue-600 cursor-pointer"
        >
          <CgEnter />
          <h1 className="ml-1 mt-2 md:mt-0">
            {makeFirstCapital(strings.shareThis)}
          </h1>
          {show && (
            <div className="absolute z-50 bg-white top-6 border-2 border-gray-300 rounded p-4">
              <div className="flex items-center border-b-2 hover:text-blue-400 border-gray-200 text-gray-600 m-2">
                <FaFacebook />
                <p className="ml-2">{"Facebook"}</p>
              </div>
              <div className="flex items-center border-b-2 hover:text-blue-400 border-gray-200 text-gray-600 m-2">
                <IoLogoTwitter />
                <p className="ml-2">{"Twitter"}</p>
              </div>
              <div className="flex items-center border-b-2 hover:text-blue-400 border-gray-200 text-gray-600 m-2">
                <FaOdnoklassnikiSquare />
                <p className="ml-2">{"ok.ru"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={`flex ${!lg ? "flex-row" : "flex-col"} justify-between`}>
        {galleryModal && (
          <div className="w-full h-full fixed top-0 left-0 right-0 bg-white z-50">
            <div
              onClick={() => setGalleryModal(false)}
              className="absolute right-0 top-0 text-4xl m-4 cursor-pointer text-customDarkBlue bg-customLightGray bg-customGrey-hoverHover rounded-full p-1 transition delay-15  0 duration-300 ease-in-out"
            >
              <IoIosClose />
            </div>
            <ProductGallery
              images={product.photos}
              modal={true}
              galleryModal={galleryModal}
            />
          </div>
        )}
        <div className="w-full flex flex-wrap">
          <div className={`${lg ? "w-full" : "w-3/5"}`}>
            <ProductGallery
              images={product.photos}
              setGalleryModal={setGalleryModal}
            />
          </div>
          <div className={`${lg ? "w-full" : "w-2/5"}`}>
            <ProductInfo product={product} />
          </div>
        </div>
        <div className={"w-full lg:w-1/3"}>
          <DeliveryPrice product={product} cartProducts={cartProducts} />
        </div>
      </div>
      {product.user && (
        <div className="flex flex-wrap border border-gray-300 rounded mt-10 md:w-full lg:w-4/5 p-4">
          <div className="flex mr-4">
            {product.user.avatar ? (
              <img src={`${product.user.avatar}`} alt="" />
            ) : (
              <div
                className={
                  "flex h-10 w-10 rounded-full bg-customBlue1 mr-2 text-white text-center text-lg items-center justify-center"
                }
              >
                <h1>{product.user.name.slice(0, 1)}</h1>
              </div>
            )}
            <div className="mr-4">
              <span className="flex text-sm text-gray-400">
                {strings.seller}:
              </span>
              {product.user.name && (
                <span className="font-bold text-sm">{product.user.name}</span>
              )}
            </div>
            <div className="h-12 w-px border border-gray-300" />
          </div>
          <div className="pt-1">
            <div className="flex items-center mb-2">
              <MdPayment className="text-2xl" />
              <span className="ml-2">{strings.safePayment}</span>
            </div>
            <div className="flex items-center">
              <IoMdReturnLeft className="text-2xl" />
              <span className="ml-2">
                {`${makeFirstCapital(
                  strings.formatString(strings.returnDayText1, 30)
                )}`}
                <span className="text-blue-400 cursor-pointer hover:text-blue-500 pl-1">
                  {`${common.companyName} Premium`}
                </span>{" "}
                {strings.formatString(strings.returnDayText2, 60)}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className={"flex flex-col mt-16"}>
        <h1 className={"text-2xl font-bold"}>
          {makeFirstCapital(strings.recommendationForYou)}
        </h1>
        <div
          className={`grid gap-1 m-auto ${
            xsm ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-5`}
        >
          <CardsContainer
            size={md ? "lg" : "base"}
            products={relatedProducts}
            count={md ? 4 : 6}
          />
        </div>
      </div>
      <Specification spesifications={spesifications} />
      <div id={"productDescription"} className={"mt-12 w-full xl:w-3/4"}>
        {product.description && (
          <div>
            <h2 className="mb-4 font-bold text-2xl">
              {makeFirstCapital(strings.description)}
            </h2>
            <p
              className="pb-3"
              dangerouslySetInnerHTML={{ __html: `${product.description}` }}
            />
          </div>
        )}
      </div>
      <ProductDesc product={product} />
      <div className={"mt-12"}>
        <h1 className="font-bold text-xl relative">
          {strings.commentsAndQuestions}{" "}
          <span className="absolute top-0 text-sm text-gray-400 ml-1 font-semibold">
            {product.reviews ? product.reviews.data.length : 0}
          </span>{" "}
        </h1>
        <div className="flex mt-10 items-center">
          <div
            className={`${
              comment
                ? "border-b-2 border-blue-400"
                : "border-b-2 border-gray-200"
            } mr-2 cursor-pointer pb-2 transition duration-300 ease-in-out`}
            style={{ color: `${comment ? "#000" : "#808d9a"}` }}
            onClick={() => {
              setComment(true);
              setQuestion(false);
            }}
          >
            <p className=" text-xs font-bold">{strings.comments}</p>{" "}
          </div>

          <div
            className={`${
              question
                ? "border-b-2 border-blue-400"
                : "border-b-2 border-gray-200"
            } cursor-pointer pb-2 ml-4 transition duration-300 ease-in-out`}
            style={{ color: `${question ? "#000" : "#808d9a"}` }}
            onClick={() => {
              setComment(false);
              setQuestion(true);
            }}
          >
            <p className="text-xs font-bold">{strings.questions}</p>{" "}
          </div>
        </div>
        {comment && (
          <section className="flex flex-col md:flex-row justify-between mt-10 w-full mb-30">
            <div className="w-full md:w-2/3">
              <h1 className="font-semibold mb-12 text-gray-500 text-sm">
                {strings.initialComment}
              </h1>
              {product.reviews &&
                product.reviews.data.map((item) => (
                  <div className={"flex flex-row mb-8"}>
                    <div className={"w-1/8"}>
                      <img
                        className={"w-10 h-10 rounded-full"}
                        src={`${base_url}${item.user.avatar}`}
                        alt={"Avatar"}
                      />
                    </div>
                    <div className="flex flex-col w-full ml-6">
                      <div className={"flex flex-row justify-between mb-4"}>
                        <div
                          className={"flex flex-row justify-start items-center"}
                        >
                          <h1 className="font-bold text-gray-900">
                            {item.user.name}
                          </h1>
                        </div>
                        <div>
                          <RatingStars
                            count={5}
                            size={25}
                            value={item.rating}
                            rating={0}
                            edit={false}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mt-1">
                          - {item.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className={"w-full md:w-1/4 flex flex-col justify-start"}>
              <div className="flex flex-row justify-between items-center  lg:text-xl p-2 border-b border-gray-200">
                <RatingStars
                  count={5}
                  size={28}
                  value={product.rating}
                  rating={0}
                  edit={false}
                />
                <div
                  id={"CommentsAndQuestionsContainer"}
                  className={"text-center font-semibold"}
                >
                  {product.rating} / 5
                </div>
              </div>
              <button
                onClick={() => {
                  let boolean = false;
                  userOrderHistory.map((order) => {
                    if (order.payment_status === "paid") {
                      order.ordered_products.data.map((pr) => {
                        if (pr.product.id === product.id) {
                          boolean = true;
                        }
                      });
                    }
                  });
                  loggedOut
                    ? setShowQuestion(true)
                    : boolean
                    ? setWriteComment(true)
                    : setShowLogin(true);
                }}
                className={`py-4 px-7 w-full mt-4 text-white rounded font-semibold bg-customBlue1 bg-customBlue2-hover focus:outline-none`}
              >
                {strings.writeComment}
              </button>
              {showLogin && (
                <DefaultModal closeBtn onClose={() => setShowLogin(false)}>
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="mt-2 font-bold text-xl">
                      {strings.buyProduct}
                    </h1>
                    <p className="text-center mt-4">{strings.buyProductInfo}</p>
                    <button
                      onClick={() => setShowLogin(false)}
                      className=" p-2 mt-4 px-4 text-white rounded font-semibold bg-customBlue1 bg-customBlue2-hover focus:outline-none"
                    >
                      {strings.close}
                    </button>
                  </div>
                </DefaultModal>
              )}
              {writeComment && (
                <DefaultModal closeBtn onClose={() => setWriteComment(false)}>
                  <p className="text-sm mt-2 mb-2 text-gray-500">
                    {strings.initialComment}
                  </p>
                  <div>
                    <textarea
                      placeholder={strings.yourComment}
                      defaultValue={productComment}
                      onChange={(e) => setProductComment(e.target.value)}
                      className="border h-40 mt-2 border-gray-300 rounded focus:outline-none p-2 w-full"
                    />
                  </div>
                  {error && <div>{error}</div>}
                  <div className="mt-2 flex flex-col justify-center items-center focus:outline-none">
                    <RatingStars
                      className="focus:outline-none"
                      count={5}
                      size={40}
                      value={reviewRating}
                      onChange={(rating) => setReviewRating(rating)}
                      rating={0}
                      edit={true}
                    />
                    <button
                      onClick={() => {
                        if (reviewRating && productComment) {
                          setWriteComment(false);
                          setError("");
                          writeCommentToProductStart(
                            {
                              product_id: product.id,
                              comment: productComment,
                              user_id: user.id,
                              rating: reviewRating,
                            },
                            token
                          );
                        } else {
                          setError("Please fill all gaps");
                        }
                      }}
                      className="p-2 mt-4 px-4 text-white rounded font-semibold bg-customBlue1 bg-customBlue2-hover focus:outline-none"
                    >
                      {makeFirstCapital(strings.send)}
                    </button>
                  </div>
                </DefaultModal>
              )}
            </div>
          </section>
        )}
        {question && (
          <section className="flex flex-col md:flex-row justify-between mt-10 ">
            <div className="w-full md:w-1/2  rounded p-4 bg-gray-100">
              <h1 className=" font-semibold text-black-800 ">
                {strings.giveQuestion}
              </h1>
              <p className="mt-2 text-xs text-black-400 font-semibold">
                {strings.questionInfo}
              </p>
              <div className="flex flex-col mb-4">
                <input
                  placeholder="Напишите свой вопрос"
                  maxLength="1000"
                  className="mt-4 w-full p-1 pl-2 border-2  border-gray-300 focus:outline-none rounded focus:ring-2 focus:ring-blue-600"
                  type="text"
                />
                <p className="text-xs text-gray-500 ml-auto">
                  Введено символов: 0/1000
                </p>
              </div>
              <h1 className="flex text-sm text-gray-600 font-semibold">
                Вы оставляете отзыв как: {"  "}
                <span className="flex text-black">
                  {loggedOut ? (
                    <button
                      onClick={() => handleModal(1)}
                      className="text-blue-700 font-bold pl-2"
                    >
                      {makeFirstCapital(strings.login)}
                    </button>
                  ) : (
                    <p className="text-black text-sm pl-2"> {user.name}</p>
                  )}
                </span>{" "}
              </h1>
              <div className="flex flex-col sm:flex-row items-center justify-between mt-2">
                <div className="flex items-center">
                  <h1 className=" mr-2 text-sm text-gray-600 font-semibold">
                    {makeFirstCapital(strings.sendQuestionAnonymous)}:{" "}
                  </h1>
                  <Switch
                    onChange={() => setAnonym(!anonym)}
                    uncheckedIcon={""}
                    checkedIcon={""}
                    offColor="#e3e6ea"
                    onColor="#0457d6"
                    width={40}
                    height={20}
                    checked={anonym}
                  />
                </div>
                <button
                  onClick={() => {
                    loggedOut && setShowQuestion(true);
                  }}
                  className="p-2 mt-2 sm:mt-0 border-2 text-white text-xs lg:text-sm rounded font-semibold bg-customBlue1 bg-customBlue2-hover focus:outline-none"
                >
                  {makeFirstCapital(strings.sendQuestion)}
                </button>
              </div>
              <h1 className="mt-4 sm:mt-8 text-sm text-gray-500 font-semibold">
                {makeFirstCapital(strings.questionInfo1)}
              </h1>
            </div>
            <div className="w-full md:w-80 mt-8 md:mt-0">
              <h1 className="font-bold mb-2">{strings.howToAsk}</h1>
              <p className="font-semibold text-sm text-gray-500">
                {makeFirstCapital(strings.howToAskInfo)}
              </p>
              <h1 className="mt-8 font-bold mb-2">{strings.mistakeInform}</h1>
              <p className="font-semibold text-sm text-gray-500">
                {makeFirstCapital(strings.mistakeInformInfo)}
              </p>
              <button className="text-sm p-2 bg-gray-100 rounded mt-1 rounded focus:outline-none font-semibold text-blue-600">
                {makeFirstCapital(strings.informMistake)}
              </button>
            </div>
          </section>
        )}
        {showQuestion && (
          <DefaultModal closeBtn onClose={() => setShowQuestion(false)}>
            <div className="flex flex-col justify-center items-center">
              <h1 className="mt-2 font-bold text-xl">
                {makeFirstCapital(strings.loginModal)}
              </h1>
              <p className="text-center mt-4">
                {makeFirstCapital(strings.pleaseLogin)}
              </p>
              <button
                onClick={() => setShowQuestion(false)}
                className=" p-2 mt-4 px-4 text-white rounded font-semibold bg-customBlue1 bg-customBlue2-hover focus:outline-none"
              >
                {makeFirstCapital(strings.close)}
              </button>
            </div>
          </DefaultModal>
        )}
      </div>
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  product: selectSelectedProductDetails,
  cartProducts: selectCartProducts,
  language: selectUserLanguage,
  relatedProducts: selectRelatedProductsOfProduct,
  loggedOut: selectUserLoggedOut,
  user: selectUserData,
  userOrderHistory: selectUserOrdersHistory,
  token: selectUserAccessToken,
  wishlist: selectUserWishlist,
  selectedForComparing: selectComparingProducts,
});

const mapDispatchToProps = (dispatch) => ({
  getProductInfo: (productId, cb) =>
    dispatch(getProductInfoStart(productId, cb)),
  handleModal: (value) => dispatch(handleModal(value)),
  writeCommentToProductStart: (comment, token) =>
    dispatch(writeCommentToProductStart(comment, token)),
  addToWishlist: (userId, productId, token) =>
    dispatch(addToWishlist(userId, productId, token)),
  removeFromWishlist: (userId, wishlistId, token) =>
    dispatch(removeFromWishlist(userId, wishlistId, token)),
  setActionStatus: (message, type) => dispatch(setActionStatus(message, type)),
  addProductForComparing: (product) =>
    dispatch(addProductForComparing(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
