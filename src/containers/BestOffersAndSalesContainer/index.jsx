import React, { useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectBestSellerProducts,
  selectTodayDealsProducts,
} from "../../redux/selectors/product";
import {
  selectLoading,
  selectVerticalBanners,
} from "../../redux/selectors/home";
import { selectUserLanguage } from "../../redux/selectors/user";

import Skeleton from "react-loading-skeleton";
import CardsContainer from "../CardsContainer";
import { OfferLink } from "./style";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";

const BestOffersAndSalesContainer = ({
  bestSellerProducts,
  todayDealsProducts,
  bannerVertical,
  loading,
  language,
}) => {
  const md = useMediaQuery(991);
  const xsm = useMediaQuery(420);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <div>
      <div className="mt-16">
        {loading ? (
          <Skeleton width={200} height={25} />
        ) : (
          <p className="text-center sm:text-left text-lg md:text-xl lg:text-2xl">
            <OfferLink>{makeFirstCapital(strings.bestOffers)}</OfferLink>
          </p>
        )}
        <div
          className={`grid gap-1 m-auto ${
            xsm ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4`}
        >
          <CardsContainer
            products={todayDealsProducts}
            size={md ? "lg" : "base"}
            count={md ? 8 : 12}
            selectedTag={"super_offer"}
          />
        </div>
      </div>
      <div className={"mt-16"}>
        {loading ? (
          <Skeleton width={200} height={25} />
        ) : (
          <p
            className={
              "text-center sm:text-left text-lg md:text-xl lg:text-2xl"
            }
          >
            <OfferLink>{makeFirstCapital(strings.hurryUp)}</OfferLink>
          </p>
        )}
        <div
          className={`grid gap-1 m-auto ${
            xsm ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4`}
        >
          <CardsContainer
            size={md ? "lg" : "base"}
            products={bestSellerProducts}
            selectedTag={"bestseller"}
            count={md ? 8 : 12}
          />
        </div>
      </div>
      {/*<div*/}
      {/*  style={{ justifySelf: "end" }}*/}
      {/*  className="col-span-1 row-span-1 hidden lg:block"*/}
      {/*>*/}
      {/*  {loading ? (*/}
      {/*    <Skeleton width={320} height={"100%"} />*/}
      {/*  ) : (*/}
      {/*    <FlexibleImage*/}
      {/*      size={"medium"}*/}
      {/*      type={"vertical"}*/}
      {/*      photo={bannerVertical[0] && bannerVertical[0].photo}*/}
      {/*      link={bannerVertical[0] && bannerVertical[0].link}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  bestSellerProducts: selectBestSellerProducts,
  todayDealsProducts: selectTodayDealsProducts,
  bannerVertical: selectVerticalBanners,
  loading: selectLoading,
  language: selectUserLanguage,
});

export default connect(mapStateToProps)(BestOffersAndSalesContainer);
