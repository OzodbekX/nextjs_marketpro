import React, { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import { base_url } from "../../constants";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { RiFullscreenFill } from "react-icons/ri";
import styled from "styled-components";

const ProductGallery = ({
  images,
  modal = false,
  setGalleryModal,
  galleryModal,
}) => {
  const [imageUrl, setImageUrl] = useState(0);

  const sm = useMediaQuery(640);
  const md = useMediaQuery(768);

  const ZoomContainer = styled.div`
    width: 100%;
    height: ${sm ? "300px" : "500px"};
  `;

  return images ? (
    <div
      className={`product-gallery ${modal && "px-5"} ${modal && "h-full"} ${
        !md ? "w-2/5" : "w-full"
      } flex w-full flex-col sm:flex-row h-auto`}
    >
      <div
        className={`flex sm:flex-col w-full sm:w-auto justify-between items-center w-1/5 h-full ${
          images.length > 6 && "overflow-y-scroll"
        }`}
      >
        {images.map((item, index) => {
          return (
            <img
              className="w-10 h-12 my-4 cursor-pointer object-cover"
              src={`${base_url}${item}`}
              alt="thumb"
              onMouseEnter={() => {
                setImageUrl(index);
              }}
            />
          );
        })}
      </div>
      <div className="w-full flex flex-row justify-center items-center py-5 h-full">
        <ZoomContainer>
          <InnerImageZoom
            src={`${base_url}${images[imageUrl]}`}
            zoomSrc={`${base_url}${images[imageUrl]}`}
          />
        </ZoomContainer>
        {/* <img className="h-full" src={`${base_url}${images[imageUrl]}`} alt="" /> */}
      </div>
      {!galleryModal && (
        <div
          onClick={() => setGalleryModal(true)}
          className="h-5 cursor-pointer ml-auto sm:m-0"
        >
          <RiFullscreenFill />
        </div>
      )}
    </div>
  ) : null;
};

export default ProductGallery;
