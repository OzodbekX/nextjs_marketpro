import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLoading } from "../../redux/selectors/home";

import Card from "../../components/Card";
import Skeleton from "react-loading-skeleton";

const CardsContainer = ({ size, count, products, loading, ...rest }) => {
  return (
    <>
      {products && !loading
        ? products.map((product, index) =>
            count
              ? index < count &&
                product && (
                  <Card key={index} size={size} product={product} {...rest} />
                )
              : product && (
                  <Card key={index} size={size} product={product} {...rest} />
                )
          )
        : count
        ? new Array(count).fill(1).map((e, i) => (
            <div key={i} className="w-32 mt-4">
              <Skeleton height={110} />
              <div className="mt-1" />
              <Skeleton height={30} />
              <div className="mt-1" />
              <Skeleton height={60} />
            </div>
          ))
        : null}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
});

export default connect(mapStateToProps)(CardsContainer);
