import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { CgProfile } from "react-icons/cg";
import { AiOutlineBars, AiOutlineCloseCircle } from "react-icons/ai";
import { BsX } from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import {
  MdAccountCircle,
  MdFavoriteBorder,
  MdInbox,
  MdSearch,
  MdShoppingBasket,
} from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";

import { selectLoading } from "../../redux/selectors/home";
import { selectCartProductsCount } from "../../redux/selectors/cart";
import {
  selectAllLanguages,
  selectUserData,
  selectUserLanguage,
  selectUserLoggedOut,
  selectUserOpenedModal,
  selectUserWishlistCount,
} from "../../redux/selectors/user";
import {
  selectCategories,
  selectFeaturedCategories,
} from "../../redux/selectors/product";

import {
  handleModal,
  languageChange,
  logOut,
} from "../../redux/modules/user/action";
import {
  getAllCategoriesStart,
  setSearchText,
  setSelectedSubCategoryId,
} from "../../redux/modules/product/actions";

import Modal from "../../containers/Modal";
import Catalog from "../Catalog";
import DefaultButton from "../common/DefaultButton";

import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";
import { useMediaQuery } from "../../hooks/useMediaQuery";

import SearchFilter from "../SearchFilter";

import SearchDropdown from "../SearchDropdown";
import SupportService from "../SupportService";
import {
  selectAllCurrencies,
  selectSelectedCurrency,
} from "../../redux/selectors/app";
import { setSelectedCurrency } from "../../redux/modules/app/actions";

const initialState = {
  search: false,
  auth: false,
};

const Header = ({
  count,
  setSearchText,
  loggedOut,
  user,
  logOut,
  getAllCategoriesStart,
  openedModal,
  handleModal,
  wishlistCount,
  languageChange,
  selectedLanguage,
  setSelectedSubCategoryId,
  categories,
  allCurrencies,
  setSelectedCurrency,
  selectedCurrency,
  allLanguages,
}) => {
  const alert = useAlert();
  const router = useRouter();

  const [toggle, setToggle] = useState(false);
  const [catalogToggle, setCatalogToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(initialState);
  const [filterModal, setFilterModal] = useState(false);

  const [text, setText] = useState("");
  const [langDropdown, setLangDropdown] = useState(false);
  const [hoverOnLeft, setHoverOnLeft] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [supportService, setSupportService] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const [focusDiv, setFocusDiv] = useState(false);
  // const [lang, setLang] = useState({ modal: false, value: "ru" });
  // const [showDropdown, setShowDropdown] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);

  const openEnterPhoneModal = () => {
    handleModal(1);
    closeModal();
  };

  const openRegisterModal = () => {
    handleModal(3);
    closeModal();
  };

  const openLoginModal = () => {
    handleModal(4);
    closeModal();
  };

  useEffect(() => {
    getAllCategoriesStart((err) => {
      alert.error(err);
    });
  }, []);

  useEffect(() => {
    if (selectedLanguage && selectedLanguage.code) {
      strings.setLanguage(selectedLanguage.code);
    }
  }, [selectedLanguage]);

  const closeModal = () => {
    setIsOpen({ ...initialState });
  };

  const openModal = (key) => {
    setIsOpen({
      ...initialState,
      [key]: true,
    });
  };

  const toggleFunction = () => {
    setToggle(!toggle);
  };

  const onLogout = () => {
    localStorage.clear();
    router.reload();
    logOut();
    alert.success(makeFirstCapital(strings.loggedOutSuccess));
    closeModal();
  };

  useEffect(() => {
    if (text) {
      setSearchText(text, selectedCategory.id);
    }
  }, [text]);

  const onLangSelect = (value) => {
    languageChange(value);
    setLangDropdown(false);
  };

  const onLangShow = () => {
    setLangDropdown(true);
    setToggle(false);
  };

  const micro = useMediaQuery(375);
  const mini = useMediaQuery(400);
  const xs = useMediaQuery(425);
  const sm = useMediaQuery(470);
  const smamd = useMediaQuery(576);
  const md = useMediaQuery(768);
  const mdalg = useMediaQuery(991);
  const lg = useMediaQuery(1024);

  return (
    <>
      {openedModal ? <Modal /> : null}
      {filterModal && (
        <SearchFilter
          setSelectedCategory={setSelectedCategory}
          setFilterModal={setFilterModal}
        />
      )}
      <div className="" style={{ padding: "0 16px" }}>
        <div className="flex flex-row justify-between pt-4 relative">
          <div className="text-xs flex w-1/16 cursor-pointer text-gray-800 hover:text-blue-800">
            <IoLocationOutline size={24} />
            <span className="mt-1 ml-1">{strings.tashkent}</span>
          </div>
          <div
            className={
              "w-1/2 xl:flex hidden flex-row justify-between items-center text-sm"
            }
          >
            <div
              style={{ backgroundColor: "#E5EFFF", color: "#4d5f71" }}
              className={
                "text-center rounded-xl px-4 text-customBlue1-hover cursor-pointer"
              }
            >
              {makeFirstCapital(strings.mobile)}
            </div>
            <div
              onClick={() => setSupportService(true)}
              className={"text-gray-500 text-customBlue1-hover cursor-pointer"}
            >
              {makeFirstCapital(strings.supportService)}
            </div>
            <div
              className={
                "text-gray-500 text-customBlue1-hover text-gray-500 cursor-pointer"
              }
            >
              {makeFirstCapital(strings.earnWithUs)}
            </div>
            <div
              onClick={() => setShowCurrencies(!showCurrencies)}
              onMouseEnter={() => setShowCurrencies(true)}
              onMouseLeave={() => setShowCurrencies(false)}
              className={"text-center text-gray-500"}
            >
              <span className={"text-customBlue1-hover cursor-pointer"}>
                {selectedCurrency.symbol} {selectedCurrency.name}
              </span>
              {showCurrencies && (
                <div
                  className={
                    "right-10 absolute bg-white w-32 z-10 fit-content shadow-catalog"
                  }
                >
                  {allCurrencies.map((currency) => (
                    <div
                      className={`w-full ${
                        selectedCurrency.name === currency.name
                          ? "bg-customBlue1 text-white"
                          : "text-customBlue1-hover bg-customGrey-hover cursor-pointer"
                      }`}
                      onClick={() => {
                        if (selectedCurrency.name !== currency.name) {
                          setSelectedCurrency(currency);
                          setShowCurrencies(false);
                        }
                      }}
                    >
                      {currency.symbol} {currency.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              onMouseMove={onLangShow}
              onMouseLeave={() => setLangDropdown(false)}
              className={
                "relative text-gray-500 text-customBlue1-hover cursor-pointer"
              }
            >
              <div className={"flex flex-row justify-between items-center"}>
                <img
                  className={"w-4 h-4 mr-2"}
                  src={`/${selectedLanguage.code}.svg`}
                  alt=""
                />
                {selectedLanguage.name}
              </div>
              {langDropdown ? (
                <ul className="absolute z-10 top-full right-0 bg-white shadow-catalog">
                  {allLanguages.map((language) => (
                    <li
                      onClick={() => onLangSelect(language)}
                      className={`${
                        selectedLanguage.code === language.code
                          ? "bg-customBlue1 text-white"
                          : "bg-customGrey-hover text-gray-500 text-customBlue1-hover"
                      } text-xs py-2 px-3 pr-8 flex flex-row justify-between`}
                    >
                      <img
                        className={"w-4 h-4 mr-2"}
                        src={`/${language.code}.svg`}
                        alt=""
                      />
                      {makeFirstCapital(language.name)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div className={"xl:hidden flex flex-row"}>
            <div
              className={
                "text-gray-500 mr-2 text-customBlue1-hover cursor-pointer"
              }
            >
              {setSelectedCurrency}
            </div>
            <div
              onMouseMove={onLangShow}
              onMouseLeave={() => setLangDropdown(false)}
              className={
                "relative text-gray-500 mr-2 text-customBlue1-hover cursor-pointer"
              }
            >
              {/*<<<<<<< HEAD*/}
              {/*              {makeFirstCapital(strings.selectedLanguage)}*/}
              {/*=======*/}
              {/*              /!* {makeFirstCapital(strings.language)} *!/*/}
              {/*              {strings.language === "язык" ? (*/}
              {/*                <img className="w-6" src="/Rus.svg" alt="" />*/}
              {/*              ) : (*/}
              {/*                <img className="w-6" src="/Uzb.svg" alt="" />*/}
              {/*              )}*/}
              {/*>>>>>>> 3f714c1b960415048c8fbd5da0823c8dd27b6b77*/}
              {langDropdown ? (
                <ul className="absolute w-12 z-10 top-full right-0 bg-white shadow-catalog">
                  <li
                    onClick={() => onLangSelect("uz")}
                    className="text-gray-500 text-xs cursor-pointer py-2 px-3 text-customBlue1-hover bg-customGrey-hover"
                  >
                    <img src="/Uzb.svg" alt="" />

                    {/* {makeFirstCapital("o'zbek")} */}
                  </li>
                  <li
                    onClick={() => onLangSelect("ru")}
                    className="text-gray-500 text-xs cursor-pointer py-2 px-3 text-customBlue1-hover bg-customGrey-hover"
                  >
                    <img src="/Rus.svg" alt="" />

                    {/* {makeFirstCapital("русский")} */}
                  </li>
                </ul>
              ) : null}
            </div>
            {!toggle ? (
              <IoIosMenu
                className="text-2xl text-gray-500 cursor-pointer hover:text-blue-600"
                onClick={toggleFunction}
              />
            ) : (
              <BsX
                className="text-2xl text-gray-500 cursor-pointer hover:text-blue-600"
                onClick={toggleFunction}
              />
            )}
          </div>
        </div>
        <div
          className={`relative flex flex-row items-center w-full pt-4 justify-${
            "between"
            // md ? "center" : "between"
          }`}
        >
          <Link href="/">
            <img
              className={`w-1/8 ${
                !md ? "flex" : "hidden"
              } h-8 cursor-pointer self-center`}
              src={"/logo.png"}
              alt="Marketplace"
            />
          </Link>

          <div
            onClick={() => {
              if (catalogToggle) {
                if (router.query.id) {
                  setSelectedSubCategoryId(router.query.id, (err) => {
                    alert.error(err);
                  });
                }
              }
              setCatalogToggle(!catalogToggle);
            }}
            className={`flex items-center justify-center bg-customBlue1 text-white cursor-pointer bg-customBlue2-hover px-${
              xs ? 1 : smamd ? 1.5 : md ? 2 : mdalg ? 1.5 : 3
            } py-${
              micro ? 1.5 : xs ? 2 : smamd ? 2.5 : mdalg ? 2 : 2.5
            } rounded border-2 border-customBlue1`}
          >
            {catalogToggle ? (
              <BsX size={sm ? 16 : 20} />
            ) : (
              <AiOutlineBars size={sm ? 16 : 20} />
            )}
            <div
              className={`ml-${sm ? 1 : 2} font-bold text-${
                mini ? "xs" : sm ? "sm" : "base"
              }`}
            >
              {makeFirstCapital(strings.catalog)}
            </div>
          </div>

          <div
            style={{ borderColor: "#005bff" }}
            className="flex border-2 rounded"
          >
            <div
              onClick={() => !selectedCategory && setFilterModal(true)}
              onMouseMove={() => setHoverOnLeft(true)}
              onMouseLeave={() => setHoverOnLeft(false)}
              // onClick={() => setCatalogToggle(!catalogToggle)}
              className={`flex items-center justify-center ${
                selectedCategory
                  ? "bg-customBlue1 cursor-auto"
                  : "bg-customGrey cursor-pointer"
              } px-${xs ? 1 : smamd ? 1.5 : 2}`}
            >
              <div
                className={`mr-${sm ? 0.5 : 1} text-${
                  selectedCategory
                    ? "white"
                    : hoverOnLeft
                    ? "customBlue1"
                    : "gray-600"
                } text-${mini ? "xs" : sm ? "sm" : "base"}`}
              >
                {selectedCategory
                  ? `${selectedCategory.name.slice(
                      0,
                      md ? (sm ? 9 : 12) : 15
                    )}...`
                  : makeFirstCapital(strings.everywhere)}
              </div>
              <div className={"pl-2 cursor-pointer"}>
                {selectedCategory ? (
                  <AiOutlineCloseCircle
                    onClick={() => setSelectedCategory("")}
                    size={sm ? 16 : 20}
                    color={"#fff"}
                  />
                ) : (
                  <TiArrowSortedDown
                    size={sm ? 16 : 24}
                    color={hoverOnLeft ? "#005bff" : "#4b5563"}
                  />
                )}
              </div>
            </div>
            <div
              className={`px-${micro ? 1 : xs ? 1.5 : sm ? 2 : 2.5} py-${
                micro ? 0.5 : xs ? 1 : sm ? 1.5 : 2
              } ${mdalg ? "" : "relative"}`}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                placeholder={makeFirstCapital(`${strings.search}...`)}
                style={{
                  width: `${
                    micro
                      ? 90
                      : mini
                      ? 140
                      : xs
                      ? 150
                      : sm
                      ? 160
                      : smamd
                      ? 170
                      : md
                      ? 260
                      : mdalg
                      ? 230
                      : 400
                    // : lg
                    // ? 400
                    // :
                  }px`,
                }}
                className={`focus:outline-none text-${
                  mini ? "xs" : sm ? "sm" : "base"
                }`}
              />
              {text ? (
                <div
                  onMouseEnter={() => setFocusDiv(true)}
                  onMouseLeave={() => setFocusDiv(false)}
                  className={`${
                    searchFocus || focusDiv ? "block" : "hidden"
                  } absolute z-20 top-full left-0 right-0 pt-1 bg-white`}
                >
                  <SearchDropdown setText={setText} />
                </div>
              ) : null}
            </div>
            <div
              className={`flex justify-center items-center bg-customBlue1 cursor-pointer bg-customBlue2-hover px-${
                xs ? 1 : smamd ? 1.5 : 2
              }`}
            >
              <MdSearch size={sm ? 18 : 24} color={"#fff"} />
            </div>
          </div>

          <div className="w-1/4 flex-row justify-between xl:flex hidden">
            <div
              onMouseLeave={() => closeModal()}
              onMouseMove={() => openModal("auth")}
              className="relative flex flex-col cursor-pointer justify-center items-center align-center text-sm text-gray-500 hover:text-blue-600"
            >
              {loggedOut ? (
                <MdAccountCircle size={24} />
              ) : (
                <CgProfile size={24} />
              )}
              <p>
                {loggedOut
                  ? makeFirstCapital(strings.login)
                  : user.name || makeFirstCapital(strings.unknown)}
              </p>
              {isOpen.auth ? (
                <>
                  {loggedOut ? (
                    <div className="absolute z-40 top-full pt-5 cursor-default text-customDarkBlue">
                      <div className="p-3 bg-white shadow-catalog rounded">
                        <div className="w-56">
                          <p className="text-justify">
                            {makeFirstCapital(strings.headerIdk1)}
                          </p>
                          <p className="text-justify">
                            {makeFirstCapital(strings.headerIdk2)}
                          </p>
                          <div className="mt-3">
                            <DefaultButton
                              textSize="text-sm"
                              paddingSize="py-1.5"
                              onClick={openEnterPhoneModal}
                              text={makeFirstCapital(
                                `${strings.login} ${strings.or} ${strings.register1}`
                              )}
                              // text={makeFirstCapital(strings.register1)}
                              // onClick={openRegisterModal}
                            />
                          </div>
                          <div className="mt-3" />
                          {/* <div className="mt-3">
                                <DefaultButton
                                  textSize="text-sm"
                                  paddingSize="py-1.5"
                                  bgColor="customGrey"
                                  textColor="customBlue1"
                                  loadingColor={"#005bff"}
                                  // text={makeFirstCapital(
                                  //   strings.personalAccount
                                  // )}
                                  // onClick={() => router.push("/user/main")}
                                  text={makeFirstCapital(strings.login)}
                                  onClick={openLoginModal}
                                />
                              </div> */}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute z-40 top-full pt-5 cursor-default text-customDarkBlue">
                      <div className="shadow-catalog bg-white rounded">
                        <div className="w-56">
                          <Link href={"/user/main"}>
                            <div className="py-2 px-3 cursor-pointer hover:bg-blue-100">
                              {makeFirstCapital(strings.personalAccount)}
                            </div>
                          </Link>
                          <div
                            onClick={onLogout}
                            className="py-2 px-3 cursor-pointer text-red-600 hover:bg-blue-100"
                          >
                            {makeFirstCapital(strings.logout)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            <Link href={"/user/orders"}>
              <a className="relative flex flex-col justify-center items-center align-center text-sm text-gray-500 hover:text-blue-600">
                <MdInbox size={24} />
                <p>{makeFirstCapital(strings.orders)}</p>
              </a>
            </Link>

            <Link href={"/user/wishlist"}>
              <a className="relative flex flex-col justify-center items-center align-center text-sm text-gray-500 hover:text-blue-600">
                <MdFavoriteBorder size={24} />
                <p>{makeFirstCapital(strings.favorites)}</p>
                <p
                  className={
                    "absolute text-white bg-red-600 font-bold -top-1 right-2 rounded-xl px-1"
                  }
                >
                  {wishlistCount || ""}
                </p>
              </a>
            </Link>

            <Link href={"/cart"}>
              <a className="relative flex flex-col justify-center items-center align-center text-sm text-gray-500 hover:text-blue-600">
                <MdShoppingBasket size={24} />
                <p>{makeFirstCapital(strings.cart)}</p>
                <p
                  className={
                    "absolute text-white bg-red-600 font-bold -top-1 right-2 rounded-xl px-1"
                  }
                >
                  {count || ""}
                </p>
              </a>
            </Link>
          </div>

          {toggle && (
            <div
              className={`z-20 absolute p-${mini ? 2 : 4} px-${
                mini ? 4 : 8
              } bg-indigo-50 top-0 right-0 ${mini ? "left-0" : ""}`}
            >
              <div className="flex flex-col justify-between items-center text-sm">
                <div
                  className={`text-${
                    sm ? "xs" : "sm"
                  } rounded-xl cursor-pointer text-customBlue1-hover`}
                >
                  <p
                    className={"px-2 p-2 border-b border-indigo-100"}
                    style={{ backgroundColor: "#E5EFFF", color: "#4d5f71" }}
                  >
                    {makeFirstCapital(strings.mobile)}
                  </p>
                </div>
                <div
                  onClick={() => setSupportService(true)}
                  className={`text-${
                    sm ? "xs" : "sm"
                  } p-2 border-b border-indigo-100 text-gray-500 mr-2 cursor-pointer text-customBlue1-hover`}
                >
                  {makeFirstCapital(strings.supportService)}
                </div>
                <div
                  className={`text-${
                    sm ? "xs" : "sm"
                  } p-2 border-b border-indigo-100 text-gray-500 mr-2 cursor-pointer text-customBlue1-hover`}
                >
                  {makeFirstCapital(strings.earnWithUs)}
                </div>
              </div>
              <div
                style={{ justifyContent: "space-evenly" }}
                className="flex flex-row border-t-2 border-gray-300 mt-2 pt-4"
              >
                <div
                  onClick={() =>
                    setIsOpen({ ...initialState, auth: !isOpen.auth })
                  }
                  className="relative mr-2 flex flex-col cursor-pointer justify-center items-center align-center text-sm text-gray-500 hover:text-blue-600"
                >
                  {loggedOut ? (
                    <MdAccountCircle size={sm ? 18 : 24} />
                  ) : (
                    <CgProfile size={sm ? 18 : 24} />
                  )}
                  <p className={sm ? "text-xs" : "text-sm"}>
                    {loggedOut
                      ? makeFirstCapital(strings.login)
                      : user.name || makeFirstCapital(strings.unknown)}
                  </p>
                  {isOpen.auth ? (
                    <div
                      className={`absolute z-40 top-full pt-5 cursor-default text-customDarkBlue ${
                        xs ? "left-0" : ""
                      }`}
                    >
                      {loggedOut ? (
                        <div className="p-3 bg-white shadow-catalog rounded">
                          <div className="w-56">
                            <p className="text-justify">
                              {makeFirstCapital(strings.headerIdk1)}
                            </p>
                            <p className="text-justify">
                              {makeFirstCapital(strings.headerIdk2)}
                            </p>
                            <div className="mt-3">
                              <DefaultButton
                                textSize="text-sm"
                                paddingSize="py-1.5"
                                onClick={() => {
                                  openEnterPhoneModal();
                                  toggleFunction();
                                }}
                                text={makeFirstCapital(
                                  `${strings.login} ${strings.or} ${strings.register1}`
                                )}
                                // text={makeFirstCapital(strings.register1)}
                                // onClick={openRegisterModal}
                              />
                            </div>
                            <div className="mt-3" />
                            {/* <div className="mt-3">
                                <DefaultButton
                                  textSize="text-sm"
                                  paddingSize="py-1.5"
                                  bgColor="customGrey"
                                  textColor="customBlue1"
                                  loadingColor={"#005bff"}
                                  // text={makeFirstCapital(
                                  //   strings.personalAccount
                                  // )}
                                  // onClick={() => router.push("/user/main")}
                                  text={makeFirstCapital(strings.login)}
                                  onClick={openLoginModal}
                                />
                              </div> */}
                          </div>
                        </div>
                      ) : (
                        <div className="shadow-catalog bg-white rounded">
                          <div className="w-56">
                            <Link href={"/user/main"}>
                              <div className="py-2 px-3 cursor-pointer hover:bg-blue-100">
                                {makeFirstCapital(strings.personalAccount)}
                              </div>
                            </Link>
                            <div
                              onClick={onLogout}
                              className="py-2 px-3 cursor-pointer text-red-600 hover:bg-blue-100"
                            >
                              {makeFirstCapital(strings.logout)}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>

                <Link href={"/user/orders"}>
                  <a className="relative flex flex-col justify-center items-center mx-2 align-center text-sm text-gray-500 hover:text-blue-600">
                    <MdInbox size={sm ? 18 : 24} />
                    <p className={sm ? "text-xs" : "text-sm"}>
                      {makeFirstCapital(strings.orders)}
                    </p>
                  </a>
                </Link>

                <Link href={"/user/wishlist"}>
                  <a className="relative flex flex-col justify-center items-center mx-2 align-center text-sm text-gray-500 hover:text-blue-600">
                    <MdFavoriteBorder size={sm ? 18 : 24} />
                    <p className={sm ? "text-xs" : "text-sm"}>
                      {makeFirstCapital(strings.favorites)}
                    </p>
                    <p
                      className={
                        "absolute text-white bg-red-600 font-bold -top-1 right-2 rounded-xl px-1"
                      }
                    >
                      {wishlistCount !== 0 && wishlistCount}
                    </p>
                  </a>
                </Link>

                <Link href={"/cart"}>
                  <a className="relative flex flex-col justify-center items-center mx-2 align-center text-sm text-gray-500 hover:text-blue-600">
                    <MdShoppingBasket size={sm ? 18 : 24} />
                    <p className={sm ? "text-xs" : "text-sm"}>
                      {makeFirstCapital(strings.cart)}
                    </p>
                    <p
                      className={
                        "absolute text-white bg-red-600 font-bold -top-1 right-2 rounded-xl p-0.5 text-xs"
                      }
                    >
                      {count !== 0 && count}
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div
          className={"flex-row justify-between mt-4 hidden lg:flex"}
          style={{ padding: "0 12px" }}
        >
          <div
            className={"hover:text-blue-600 cursor-pointer"}
            onClick={() => router.push("/seller")}
          >
            {makeFirstCapital(strings.markets)}
          </div>
          <div
            className={"hover:text-blue-600 cursor-pointer"}
            onClick={() => router.push("/brand")}
          >
            {makeFirstCapital(strings.brands)}
          </div>
          <div
            className={"hover:text-blue-600 cursor-pointer"}
            onClick={() => router.push("/")}
          >
            {makeFirstCapital(strings.sales)}
          </div>
          <div
            className={"hover:text-blue-600 cursor-pointer"}
            onClick={() => router.push("/")}
          >
            {makeFirstCapital(strings.coupons)}
          </div>
          {categories.map(
            (category, index) =>
              index < 5 && (
                <div
                  className={"hover:text-blue-600 cursor-pointer"}
                  onClick={() => router.push(`/category/${category.slug}`)}
                >
                  {category.name}
                </div>
              )
          )}
          <div
            className={"hover:text-blue-600 cursor-pointer font-bold"}
            onMouseEnter={() => setCatalogToggle(true)}
            onMouseLeave={() => setCatalogToggle(false)}
          >
            . . .
          </div>
        </div>
        {/*  , ,  , ,*/}
        {/* important */}
        {/* {loading ? (
          <div className="mt-5">
            <Skeleton width={"100%"} height={25} />
          </div>
        ) : (
          <div
            className={"xl:flex hidden flex-row justify-between mt-5 text-sm"}
          >
            {featuredCategories.map((category) => (
              <div
                onClick={() => router.push(`/category/${category.id}`)}
                className={
                  "px-3 text-gray-500 text-customBlue1-hover cursor-pointer"
                }
              >
                {category.name}
              </div>
            ))}
          </div>
        )} */}
        {catalogToggle && (
          <div
            onMouseEnter={() => setCatalogToggle(true)}
            onMouseLeave={() => setCatalogToggle(false)}
            className="z-50 absolute top-30 left-0 right-0"
          >
            <Catalog setCatalogToggle={setCatalogToggle} />
          </div>
        )}
        {supportService && (
          <SupportService setSupportService={setSupportService} />
        )}
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  count: selectCartProductsCount,
  loggedOut: selectUserLoggedOut,
  user: selectUserData,
  openedModal: selectUserOpenedModal,
  wishlistCount: selectUserWishlistCount,
  featuredCategories: selectFeaturedCategories,
  loading: selectLoading,
  selectedLanguage: selectUserLanguage,
  categories: selectCategories,
  allCurrencies: selectAllCurrencies,
  selectedCurrency: selectSelectedCurrency,
  allLanguages: selectAllLanguages,
});

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logOut()),
  getAllCategoriesStart: (cb) => dispatch(getAllCategoriesStart(cb)),
  setSearchText: (searchText, categoryId) =>
    dispatch(setSearchText(searchText, categoryId)),
  handleModal: (value) => dispatch(handleModal(value)),
  languageChange: (value) => dispatch(languageChange(value)),
  setSelectedSubCategoryId: (categoryId, cb) =>
    dispatch(setSelectedSubCategoryId(categoryId, cb)),
  setSelectedCurrency: (selectedCurrency) =>
    dispatch(setSelectedCurrency(selectedCurrency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
