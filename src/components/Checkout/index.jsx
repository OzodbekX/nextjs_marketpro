import { useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { strings } from "../../locales/strings";
import { makeFirstCapital, normalizePrice } from "../../utils";
import { useRouter } from "next/router";
import { createStructuredSelector } from "reselect";
import {
  selectUserLoggedOut,
  selectUserLanguage,
} from "../../redux/selectors/user";
import { handleModal } from "../../redux/modules/user/action";
import { selectSelectedCurrency } from "../../redux/selectors/app";

const Checkout = ({
  count,
  oldTotal,
  newTotal,
  totalWeight,
  loggedOut,
  handleModal,
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
    <div className={"flex flex-col bg-customGrey"}>
      <div className={"p-6 border-b-4 border-white"}>
        <div
          className={`py-4 px-6 mb-3 bg-customGreen font-bold text-white  text-center ${
            count !== 0
              ? "opacity-100 hover:opacity-90 cursor-pointer"
              : "opacity-60"
          }`}
          onClick={() => {
            if (!loggedOut) {
              router.push("/checkout");
            } else {
              handleModal(1);
            }
          }}
        >
          {makeFirstCapital(strings.checkout)}
        </div>
        <div className={"text-sm text-customGreyText"}>
          {makeFirstCapital(strings.checkoutInfo)}
        </div>
      </div>
      <div className={"p-6 border-b-4 border-white"}>
        <div>
          <div className={"flex justify-between"}>
            <div className={"text-allbestcardBalck text-lg font-bold"}>
              {makeFirstCapital(strings.yourCart)}
            </div>
            <div className={"text-sm text-customGreyText pb-4"}>
              {count} {makeFirstCapital(strings.goods1)} • {totalWeight}{" "}
              {makeFirstCapital(strings.cart)}
            </div>
          </div>

          <div className={"flex justify-between  mb-3"}>
            <div className={"text-allbestcardBalck text-sm"}>
              {makeFirstCapital(strings.goods)} ({count})
            </div>
            <div className={"text-sm font-bold text-allbestcardBalck"}>
              {selectedCurrency.symbol}{" "}
              {normalizePrice(
                (newTotal * selectedCurrency.exchange_rate)
                  .toFixed(0)
                  .toString()
              )}
            </div>
          </div>

          {oldTotal !== newTotal && (
            <div className={"flex justify-between  mb-3"}>
              <div className={"text-allbestcardBalck text-sm"}>
                {makeFirstCapital(strings.discount)}
                <Link href="/">
                  <p
                    className={
                      "text-customBlue1 cursor-pointer text-customBlue2-hover"
                    }
                  >
                    {makeFirstCapital(strings.moreInfo)}
                  </p>
                </Link>
              </div>
              <div className={"text-sm font-bold text-customPink"}>
                - {selectedCurrency.symbol}{" "}
                {normalizePrice(
                  ((oldTotal - newTotal) * selectedCurrency.exchange_rate)
                    .toFixed(0)
                    .toString()
                )}
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-between">
          <div className={"text-xl text-allbestcardBalck font-bold"}>
            {makeFirstCapital(strings.totalCost)}
          </div>
          <div className={"text-xl text-allbestcardBalck font-bold"}>
            {selectedCurrency.symbol}{" "}
            {normalizePrice(
              (oldTotal * selectedCurrency.exchange_rate).toFixed(0).toString()
            )}
          </div>
        </div>
      </div>

      <div className={"p-6"}>
        <div
          className={`font-bold text-center text-allbestcardBalck py-4 px-6 border-customYellow border-2 ${
            count !== 0
              ? "opacit-100 cursor-pointer bg-customYellow-hover"
              : "opacity-60"
          }`}
        >
          {makeFirstCapital(strings.applyForLoan)}
        </div>
        <div className="text-sm text-customGreyText mt-4">
          {makeFirstCapital(strings.onlineApply)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loggedOut: selectUserLoggedOut,
  language: selectUserLanguage,
  selectedCurrency: selectSelectedCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  handleModal: (value) => dispatch(handleModal(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
