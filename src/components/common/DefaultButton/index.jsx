import React from "react";
import { Spinner } from "react-activity";

const DefaultButton = ({
  text,
  bgColor,
  textColor,
  textSize,
  textAlign,
  paddingSize,
  rounded,
  onClick,
  loading,
  loadingColor,
  disabled,
  disableHover,
}) => {
  text = text || "ss";
  paddingSize = paddingSize || "py-2 px-3";
  bgColor = bgColor || "customBlue1";
  textColor = textColor || "white";
  textSize = textSize || "text-base";
  rounded = rounded || "rounded";
  textAlign = textAlign || "text-center";
  loadingColor = loadingColor || "#fff";
  onClick = onClick ? onClick : () => {};

  return disabled ? (
    <div
      className={`font-bold ${paddingSize} bg-gray-400 text-${textColor} ${textSize} ${rounded} ${textAlign}`}
    >
      {text}
    </div>
  ) : (
    <div
      onClick={onClick}
      className={`font-bold cursor-pointer ${
        !disableHover ? "bg-customBlue1-hover" : ""
      } ${paddingSize} bg-${bgColor} text-${textColor} ${textSize} ${rounded} ${textAlign}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner size={16} color={loadingColor} />
        </div>
      ) : (
        text
      )}
    </div>
  );
};

export default DefaultButton;
