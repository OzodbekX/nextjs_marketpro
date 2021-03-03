import React from "react";
import ImagesLine from "../ImagesLine";

const FourImagesAndBigTitleContainer = ({ title, images, size }) => {
  return (
    <>
      <h3 className={"text-2xl font-extrabold text-gray-900 pl-3 pb-5"}>
        {title}
      </h3>
      <ImagesLine size={size} images={images} type={"square"} hasPadding />
    </>
  );
};

export default FourImagesAndBigTitleContainer;
