import React from "react";
import { connect } from "react-redux";
import DefaultButton from "../common/DefaultButton";
import { AiFillTwitterCircle, AiOutlineInstagram } from "react-icons/ai";
import { FaFacebook, FaTelegram } from "react-icons/fa";
import { makeFirstCapital } from "../../utils";
import { strings } from "../../locales/strings";
import { common } from "../../constants";
import { useRouter } from "next/router";
import { handleModal } from "../../redux/modules/user/action";

const Footer = ({ handleModal }) => {
  const router = useRouter();

  return (
    <>
      {/*<div className="flex flex-wrap mt-8">*/}
      {/*  <div*/}
      {/*    onClick={() => router.push(`/pages/termsAndConditionsPage`)}*/}
      {/*    className="cursor-pointer py-7 lg:py-8 text-sm lg:text-base text-customDarkBlue border border-customGrey cursor-pointer w-1/2 lg:w-1/4  flex flex-col justify-center items-center modalBg-hover"*/}
      {/*  >*/}
      {/*    <div className="mb-1 lg:mb-2 text-2xl lg:text-3xl text-customDarkBlue">*/}
      {/*      <FiFileText />*/}
      {/*    </div>*/}
      {/*    {strings.termsAndConditions}*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    onClick={() => router.push(`/pages/returnPolicyPage`)}*/}
      {/*    className="cursor-pointer py-7 lg:py-8 text-sm lg:text-base text-customDarkBlue border border-customGrey cursor-pointer w-1/2 lg:w-1/4  flex flex-col justify-center items-center modalBg-hover"*/}
      {/*  >*/}
      {/*    <RiArrowGoBackLine className="mb-1 lg:mb-2 text-2xl lg:text-3xl text-customDarkBlue" />*/}
      {/*    {strings.returnPolicy}*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    onClick={() => router.push(`/pages/supportPolicyPage`)}*/}
      {/*    className="cursor-pointer py-7 lg:py-8 text-sm lg:text-base text-customDarkBlue border border-customGrey cursor-pointer w-1/2 lg:w-1/4  flex flex-col justify-center items-center modalBg-hover"*/}
      {/*  >*/}
      {/*    <HiOutlineSupport className="mb-1 lg:mb-2 text-2xl lg:text-3xl text-customDarkBlue" />*/}
      {/*    {strings.supportPolicy}*/}
      {/*  </div>*/}
      {/*  <div*/}
      {/*    onClick={() => router.push(`/pages/privacyPolicyPage`)}*/}
      {/*    className="cursor-pointer py-7 lg:py-8 text-sm lg:text-base text-customDarkBlue border border-customGrey cursor-pointer w-1/2 lg:w-1/4  flex flex-col justify-center items-center modalBg-hover"*/}
      {/*  >*/}
      {/*    <HiOutlineExclamationCircle className="mb-1 lg:mb-2 text-2xl lg:text-3xl text-customDarkBlue" />*/}
      {/*    {strings.privacyPolicy}*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="grid grid-cols-1 justify-items-center sm:justify-items-stretch sm:py-8 modalBg mt-8 rounded">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <div className="mt-8 sm:mt-0 sm:mx-auto">
            <div className="my-0 mx-auto">
              <h1 className="font-bold text-base text-customDarkBlue">
                {makeFirstCapital(strings.earnWithUs1)}
              </h1>
              <p className="text-customDarkBlue text-customBlue1-hover cursor-pointer mt-2 text-sm">
                {makeFirstCapital(
                  strings.formatString(strings.yourProducts, common.companyName)
                )}
              </p>
              <p className="text-customDarkBlue text-customBlue1-hover cursor-pointer mt-2 text-sm">
                {makeFirstCapital(
                  strings.formatString(
                    strings.openThePickUpPoint,
                    common.companyName
                  )
                )}
              </p>
              <p className="text-customDarkBlue text-customBlue1-hover cursor-pointer mt-2 text-sm">
                {makeFirstCapital(
                  strings.formatString(
                    strings.becomeCourier,
                    common.companyName
                  )
                )}
              </p>
              <p className="text-customDarkBlue text-customBlue1-hover cursor-pointer mt-2 text-sm">
                {makeFirstCapital(
                  strings.formatString(
                    strings.educationalCenter,
                    common.companyName
                  )
                )}
              </p>

              <div className="mt-5 flex justify-start">
                <DefaultButton
                  onClick={() => handleModal(1)}
                  textSize={"text-sm"}
                  bgColor={"customBlue2"}
                  paddingSize={"px-6 py-2"}
                  text={makeFirstCapital(strings.partnerCabinet)}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-0 sm:mx-auto">
            <div>
              <h1 className="font-bold text-base text-customDarkBlue">
                {makeFirstCapital(strings.aboutCompany)}
              </h1>
              <p className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer">
                {makeFirstCapital(strings.aboutTradingPlatform)}
              </p>
              <p className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer">
                {makeFirstCapital(strings.vacancies)}
              </p>
              <p className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer">
                {makeFirstCapital(strings.pressContacts)}
              </p>
              <p className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer">
                {makeFirstCapital(strings.complianceHotline)}
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-8 sm:mx-auto lg:mt-0">
            <div>
              <h1 className="font-bold text-base text-customDarkBlue">
                {makeFirstCapital(strings.help)}
              </h1>
              <p
                onClick={() => router.push("/pages/returnPolicyPage")}
                className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer cursor-pointer"
              >
                {makeFirstCapital(strings.howToMakeAnOrder)}
              </p>
              <p
                onClick={() => router.push("/pages/termsAndConditionsPage")}
                className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer cursor-pointer"
              >
                {makeFirstCapital(strings.delivery)}
              </p>
              <p className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer cursor-pointer">
                {makeFirstCapital(strings.payment)}
              </p>
              <p className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer cursor-pointer">
                {makeFirstCapital(strings.refundOfPayment)}
              </p>
              <p className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer cursor-pointer">
                {makeFirstCapital(strings.returnExchangeAndRepairOfGoods)}
              </p>
              <p className="text-customDarkBlue mt-2 text-sm text-customBlue1-hover cursor-pointer cursor-pointer">
                {makeFirstCapital(strings.contacts)}
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-8 sm:mx-auto lg:mt-0">
            <h1 className="font-bold text-base text-customDarkBlue">
              {makeFirstCapital(
                strings.formatString(strings.downloadTheApp, common.companyName)
              )}
            </h1>
            <div className="mx-auto mt-5 w-40 cursor-pointer">
              <img
                src={"/play-market1.png"}
                style={{ width: "100%" }}
                alt={"Play Market"}
              />
            </div>
            <div className="mx-auto mt-5 w-40 cursor-pointer">
              <img
                src={"/app-store1.svg"}
                style={{ width: "100%" }}
                alt={"App Store"}
              />
            </div>
            {/* <QrCode
              onClick={() => router.push("https://google.com")}
              className={"cursor-pointer mx-auto"}
              value={"https://google.com"}
            /> */}
            <div className="flex justify-center items-center mt-3">
              <div className="cursor-pointer mr-3">
                <FaFacebook style={{ color: "#3b5998" }} className="text-2xl" />
              </div>
              <div className="cursor-pointer mr-3">
                <FaTelegram style={{ color: "#0088cc" }} className="text-2xl" />
              </div>
              <div className="cursor-pointer mr-3">
                <AiFillTwitterCircle
                  style={{ color: "#00acee" }}
                  className="text-3xl"
                />
              </div>
              <div className="cursor-pointer mr-3">
                <AiOutlineInstagram
                  style={{
                    background:
                      "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                  }}
                  className="text-2xl text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 mx-4 text-sm text-center text-gray-700">
        {"© 2021 ООО «BMG Venture investments». Все права защищены."}
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  handleModal: (value) => dispatch(handleModal(value)),
});

export default connect(null, mapDispatchToProps)(Footer);
