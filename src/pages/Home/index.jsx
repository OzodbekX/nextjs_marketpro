import React, { useEffect } from "react";

import { useAlert } from "react-alert";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCarouselSliders,
  selectHorizontalBanners,
  selectLoading,
  selectSquareBanners,
  selectVerticalBanners,
} from "../../redux/selectors/home";
import {
  selectUserLanguage,
  selectUserLoggedOut,
} from "../../redux/selectors/user";
import { getHomePageStart } from "../../redux/modules/home/actions";
import {
  selectAllMarkets,
  selectBestSellerProducts,
  selectFeaturedProducts,
  selectFreeShippingProducts,
  selectIsFetched,
  selectSuperDiscountProducts,
} from "../../redux/selectors/product";

import Skeleton from "react-loading-skeleton";
import ImagesLine from "../../containers/ImagesLine";
import BestOffersAndSalesContainer from "../../containers/BestOffersAndSalesContainer";
import CardsContainer from "../../containers/CardsContainer";
import SwiperContainer from "../../containers/SwiperContainer";
import RecommendationContainer from "../../containers/RecommendationContainer";
import FlexibleImage from "../../components/FlexibleImage";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { selectBannerHorizontalSection } from "../../utils";
import { strings } from "../../locales/strings";
import AllMarketsContainer from "../../containers/AllMarketsContainer";
import { getAllMarketsStart } from "../../redux/modules/product/actions";

const HomePage = ({
  getHomePageStart,
  loading,
  freeShippingProducts,
  featuredProducts,
  superDiscountProducts,
  loggedOut,
  bestSellerProducts,
  sliders,
  bannerVertical,
  bannerHorizontal,
  isFetched,
  language,
  allMarkets,
  getAllMarketsStart,
}) => {
  const alert = useAlert();

  useEffect(() => {
    if (!isFetched) {
      getHomePageStart((errorMessage) => {
        alert.error(errorMessage);
      });
    }

    getAllMarketsStart();
  }, []);

  const md = useMediaQuery(991);
  const xsm = useMediaQuery(420);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <div>
      <div className="mt-5">
        {loading ? (
          <div className="h-64">
            <Skeleton height={"100%"} />
          </div>
        ) : (
          <SwiperContainer count={sliders.length} pagination loop>
            {sliders.map((slide, index) => (
              <div key={index} className="h-64">
                <FlexibleImage
                  cover
                  photo={slide.photo}
                  link={slide.link}
                  fullSize
                />
              </div>
            ))}
          </SwiperContainer>
        )}
      </div>
      <div
        className={
          "mt-8 grid gird-cols-1 lg:grid-cols-3 gap-4 justify-items-center"
        }
      >
        <ImagesLine
          size={"small"}
          type={"horizontal"}
          images={selectBannerHorizontalSection(bannerHorizontal, 0, 2)}
          count={3}
          fullSize
        />
      </div>
      <BestOffersAndSalesContainer />
      {loading ? (
        <div className="my-5">
          <Skeleton width={300} height={35} />
        </div>
      ) : (
        <div className="inline-block cursor-pointer text-2xl font-bold text-customDarkBlue text-customBlue2-hover mt-16">
          {strings.superDiscount}
        </div>
      )}
      <div>
        <div
          className={`grid gap-1 m-auto ${
            xsm ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4`}
        >
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"> */}
          <CardsContainer
            products={
              superDiscountProducts &&
              superDiscountProducts.map((prd) => prd && prd.product)
            }
            size={md ? "lg" : "base"}
            count={md ? 8 : 12}
            hasBtn
          />
        </div>
      </div>
      <div
        className={
          "py-3 justify-items-center grid grid-cols-1 lg:grid-cols-3 gap-4 mt-12"
        }
      >
        <ImagesLine
          size={"small"}
          type={"horizontal"}
          images={selectBannerHorizontalSection(bannerHorizontal, 0, 2)}
          count={3}
        />
      </div>
      {loading ? (
        <div className="my-5">
          <Skeleton width={300} height={35} />
        </div>
      ) : (
        <div className="inline-block cursor-pointer mt-16 text-2xl font-bold text-customDarkBlue text-customBlue2-hover">
          {strings.popularGoods}
        </div>
      )}
      <div className="col-span-5 lg:col-span-4">
        <div
          className={`grid gap-1 m-auto ${
            xsm ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4`}
        >
          <CardsContainer
            products={bestSellerProducts}
            size={md ? "lg" : "base"}
            count={md ? 8 : 12}
            hasRating
            selectedTag={"popular"}
          />
        </div>
      </div>
      <div>
        <AllMarketsContainer items={allMarkets} count={4} />
      </div>
      {loading ? (
        <div className="my-5">
          <Skeleton width={300} height={35} />
        </div>
      ) : (
        <div className="inline-block cursor-pointer mt-16 text-2xl font-bold text-customDarkBlue text-customBlue2-hover">
          {strings.freeShipping}
        </div>
      )}
      <div>
        <div
          className={`grid gap-1 m-auto ${
            xsm ? "grid-cols-1" : "grid-cols-2"
          } sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4`}
        >
          <CardsContainer
            size={md ? "lg" : "base"}
            products={bestSellerProducts}
            count={md ? 8 : 12}
            hasBtn
          />
        </div>
      </div>
      <div
        className={
          "justify-items-center grid gird-cols-1 lg:grid-cols-3 gap-4 mt-12"
        }
      >
        <ImagesLine
          size={"small"}
          type={"horizontal"}
          images={selectBannerHorizontalSection(bannerHorizontal, 0, 2)}
          count={3}
        />
      </div>
      <RecommendationContainer />
    </div>
  );
  // ) : (
  //   <div className={"h-72"}>
  //     <p>Loading</p>
  //   </div>
  // );
};

export const mapStateToProps = createStructuredSelector({
  sliders: selectCarouselSliders,
  bestSellerProducts: selectBestSellerProducts,
  freeShippingProducts: selectFreeShippingProducts,
  featuredProducts: selectFeaturedProducts,
  superDiscountProducts: selectSuperDiscountProducts,
  bannerVertical: selectVerticalBanners,
  bannerHorizontal: selectHorizontalBanners,
  bannerSquare: selectSquareBanners,
  loading: selectLoading,
  loggedOut: selectUserLoggedOut,
  isFetched: selectIsFetched,
  language: selectUserLanguage,
  allMarkets: selectAllMarkets,
});

export const mapDispatchToProps = (dispatch) => ({
  getHomePageStart: (cb) => dispatch(getHomePageStart(cb)),
  getAllMarketsStart: () => dispatch(getAllMarketsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
