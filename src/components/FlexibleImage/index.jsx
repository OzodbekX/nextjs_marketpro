import React from "react";
import Link from "next/link";
import { base_url } from "../../constants";

const FlexibleImage = ({
  size,
  type,
  photo,
  link,
  url,
  banner,
  name,
  description,
  halfWidth,
  fullSize,
  hasPadding,
  isHoverable,
  contain,
  cover,
  titleClassName,
  descClassName,
}) => {
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
    <div
      className={`cursor-pointer ${hasPadding && "pl-3 pb-3"} ${
        halfWidth && "w-1/2"
      } ${fullSize ? "w-full h-full" : ""}`}
      style={customWidth ? { maxWidth: `${customWidth}px` } : undefined}
    >
      <Link href={link ? link : url ? url : "/"}>
        <div className={`img-holder relative ${fullSize ? "h-full" : ""}`}>
          <img
            className={`w-full ${fullSize ? "h-full" : ""} ${
              isHoverable && "cursor-pointer"
            } ${contain ? "object-contain" : ""} ${
              cover ? "object-cover" : ""
            }`}
            src={photo ? `${base_url}${photo}` : `${base_url}${banner}`}
            alt={name}
          />
          {isHoverable && (
            <div className="absolute w-full h-full Class Properties inset-0 bg-black bg-opacity-25 opacity-0 transition 0.5s ease hover:opacity-100 cursor-pointer" />
          )}
        </div>
      </Link>
      {name && <p className={`${titleClassName}`}>{name}</p>}
      {description && <p className={`${descClassName}`}>{description}</p>}
    </div>
  );
};

export default FlexibleImage;
