import React from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectLoading } from "../../redux/selectors/home";

import Skeleton from "react-loading-skeleton";
import FlexibleImage from "../../components/FlexibleImage";

const ImagesLine = ({ images, size, type, count, loading, ...rest }) => {
  const customWidth =
    size === "small" && type === "horizontal"
      ? 454
      : size === "medium" && type === "vertical"
      ? 320
      : size === "small" && type === "vertical"
      ? 336
      : size === "large" && type === "horizontal"
      ? 1421
      : size === "medium" && type === "square"
      ? 580
      : size === "thin" && type === "vertical"
      ? 259
      : size === "small" && type === "square"
      ? 4471
      : size === "large" && type === "square"
      ? 750
      : 0;

  return (
    <>
      {!loading
        ? images.map((img, index) =>
            count ? (
              index < count && (
                <FlexibleImage
                  key={index}
                  size={size}
                  type={type}
                  {...rest}
                  {...img}
                />
              )
            ) : (
              <FlexibleImage
                key={index}
                size={size}
                img={img}
                type={type}
                {...rest}
                {...img}
              />
            )
          )
        : new Array(count).fill(1).map((e, i) => (
            <div key={i} style={{ width: `${customWidth - 30}px` }}>
              <Skeleton width={"100%"} height={160} />
            </div>
          ))}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
});

export default connect(mapStateToProps)(ImagesLine);
