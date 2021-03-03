import React, { useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectBestSellerProducts } from "../../redux/selectors/product";
import { selectUserLanguage } from "../../redux/selectors/user";
import { selectLoading } from "../../redux/selectors/home";

import Skeleton from "react-loading-skeleton";
import CardsContainer from "../CardsContainer";

import { strings } from "../../locales/strings";
import { makeFirstCapital } from "../../utils";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const RecommendationContainer = ({ bestSellerProducts, loading, language }) => {
  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  const md = useMediaQuery(991);
  const xsm = useMediaQuery(420);

  return (
    <div className={"mb-16 mt-16"}>
      {loading ? (
        <div className="my-5">
          <Skeleton width={300} height={35} />
        </div>
      ) : (
        <h1 className="inline-block cursor-pointer my-5 text-2xl font-bold text-customDarkBlue text-customBlue2-hover">
          {makeFirstCapital(strings.recommendation)}
        </h1>
      )}
      <div
        className={`grid gap-1 m-auto ${
          xsm ? "grid-cols-1" : "grid-cols-2"
        } sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-4`}
      >
        <CardsContainer
          products={bestSellerProducts}
          size={md ? "lg" : "base"}
          count={md ? 4 : 6}
          hasBtn={true}
        />
      </div>
    </div>
  );
};

export const mapStateToProps = createStructuredSelector({
  bestSellerProducts: selectBestSellerProducts,
  loading: selectLoading,
  language: selectUserLanguage,
});

export default connect(mapStateToProps)(RecommendationContainer);
