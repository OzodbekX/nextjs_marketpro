import Link from "next/link";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserLanguage } from "../../redux/selectors/user";
import { FiFileText } from "react-icons/fi";
import QrCode from "qrcode.react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { HiOutlineExclamationCircle, HiOutlineSupport } from "react-icons/hi";
import { useRouter } from "next/router";

import DefaultButton from "../common/DefaultButton";

import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";
import { useEffect } from "react";

const Footer = ({
  address = "address",
  phone = "phone",
  email = "email",
  language,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <>
      {/* footer-top */}
      <div className="flex flex-wrap mt-8">
        <Link href="/">
          <div className="py-7 lg:py-8 text-sm lg:text-base text-customDarkBlue border border-customGrey cursor-pointer w-1/2 lg:w-1/4  flex flex-col justify-center items-center modalBg-hover">
            <div className="mb-1 lg:mb-2 text-2xl lg:text-3xl text-customDarkBlue">
              <FiFileText />
            </div>
            {strings.termsAndConditions}
          </div>
        </Link>
        <Link href="/">
          <div className="py-7 lg:py-8 text-sm lg:text-base text-customDarkBlue border border-customGrey cursor-pointer w-1/2 lg:w-1/4  flex flex-col justify-center items-center modalBg-hover">
            <RiArrowGoBackLine className="mb-1 lg:mb-2 text-2xl lg:text-3xl text-customDarkBlue" />
            {strings.returnPolicy}
          </div>
        </Link>
        <Link href="/">
          <div className="py-7 lg:py-8 text-sm lg:text-base text-customDarkBlue border border-customGrey cursor-pointer w-1/2 lg:w-1/4  flex flex-col justify-center items-center modalBg-hover">
            <HiOutlineSupport className="mb-1 lg:mb-2 text-2xl lg:text-3xl text-customDarkBlue" />
            {strings.supportPolicy}
          </div>
        </Link>
        <Link href="/">
          <div className="py-7 lg:py-8 text-sm lg:text-base text-customDarkBlue border border-customGrey cursor-pointer w-1/2 lg:w-1/4  flex flex-col justify-center items-center modalBg-hover">
            <HiOutlineExclamationCircle className="mb-1 lg:mb-2 text-2xl lg:text-3xl text-customDarkBlue" />
            {strings.privacyPolicy}
          </div>
        </Link>
      </div>

      {/* footer */}
      <div className="py-8 grid grid-cols-4 modalBg">
        {/* col-1 */}
        <div className="col-span-2 mt-4 lg:mt-0 lg:col-span-1 justify-self-center order-last lg:order-first">
          {/* <div>
            <div className="w-32">
              <img
                className="w-full mb-4"
                src="http://localhost:3000/logo.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center flex-wrap">
              <input
                className="px-4 py-1 mr-1 w-52 border-2 text-customDarkBlue rounded border-customGreyBottom focus:outline-none focus:ring-2 focus:ring-customGreyBottom focus:border-transparent"
                type="text"
                placeholder={makeFirstCapital(strings.subscribe)}
              />
              <div className="p-2 cursor-pointer bg-customBlue1-hover rounded bg-customBlue2 text-lg flex justify-center items-center text-white">
                <AiOutlineArrowRight />
              </div>
            </div>
          </div> */}
          <div className="flex flex-col">
            <div className="font-bold text-sm text-customDarkBlue mb-2.5 uppercase">
              {strings.beSeller}
            </div>
            <DefaultButton
              text={makeFirstCapital(strings.applyNow)}
              bgColor={"customBlue2"}
              textSize={"text-sm"}
            />
          </div>
          <div className="w-32 mt-8">
            <img
              className="w-full mb-4"
              src="http://localhost:3000/logo.jpg"
              alt=""
            />
          </div>
        </div>

        {/* col-2 */}
        <div className="col-span-2 lg:col-span-1 justify-self-center">
          <div className="font-bold text-sm text-customDarkBlue mb-2.5">
            {makeFirstCapital(strings.contactInfo)}
          </div>
          <ul className="text-sm text-customDarkBlue2 capitalize">
            <li className="mb-2.5">
              <a href="https://www.google.com/maps?q=45,65" target={"_blank"}>
                {makeFirstCapital(strings.address)}: <span>{address}</span>
              </a>
            </li>
            <li className="mb-2.5">
              {makeFirstCapital(strings.phone)}: <Link href="/">{phone}</Link>
            </li>
            <li className="mb-2.5">
              {makeFirstCapital(strings.email)}: <Link href="/">{email}</Link>
            </li>
          </ul>
        </div>

        {/* col-3 */}
        <div className="col-span-2 lg:col-span-1  justify-self-center">
          <div className="font-bold text-sm text-customDarkBlue mb-2.5 uppercase">
            {makeFirstCapital(strings.myAccount)}
          </div>
          <ul className="text-sm text-customDarkBlue2">
            <li className="mb-2.5">
              <Link href="/">
                <a>{makeFirstCapital(strings.logIn)}</a>
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/">
                <a>{makeFirstCapital(strings.orderHistory)}</a>
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/">
                <a>{makeFirstCapital(strings.myWishlist)}</a>
              </Link>
            </li>
            <li className="mb-2.5">
              <Link href="/">
                <a>{makeFirstCapital(strings.trackOrder)}</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* col-4 */}
        <div className="col-span-2 mt-4 lg:mt-0 lg:col-span-1 justify-self-center">
          <QrCode
            onClick={() => router.push("https://google.com")}
            className={"cursor-pointer"}
            value={"https://google.com"}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  language: selectUserLanguage,
});

export default connect(mapStateToProps)(Footer);
