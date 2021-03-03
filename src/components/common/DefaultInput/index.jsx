import React, { useRef, useEffect } from "react";

const DefaultInput = ({
  inputType,
  name,
  value,
  wh,
  paddingSize,
  borderWidth,
  borderColor,
  bgColor,
  textColor,
  fontSize,
  fontWeight,
  rounded,
  onFocuesBorderColor,
  error,
  margin,
  maxLength,
  disabled,
  focused,
  onChange,
  onBlur,
  onFocus,
  onKeyPress,
}) => {
  let inputRef = useRef(null);

  inputType = inputType || "text";
  name = name || "";
  value = value || "";
  wh = wh || "w-full h-12";
  paddingSize = paddingSize || "px-2 pt-4";
  borderWidth = borderWidth || "2";
  borderColor = error ? "red-400" : borderColor ? borderColor : "gray-300";
  bgColor = bgColor || "white";
  textColor = textColor || "customDarkBlue";
  fontSize = fontSize || "base";
  fontWeight = fontWeight || "medium";
  rounded = rounded || "rounded";
  margin = margin || "m-auto";
  onFocuesBorderColor = onFocuesBorderColor || "blue-400";
  onChange = onChange ? onChange : () => {};
  onBlur = onBlur ? onBlur : () => {};
  onFocus = onFocus ? onFocus : () => {};
  onKeyPress = onKeyPress ? onKeyPress : () => {};

  useEffect(() => {
    if (focused) {
      if (inputRef && inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [focused]);

  return (
    <input
      ref={inputRef}
      type={inputType}
      name={name}
      value={value}
      onKeyPress={onKeyPress}
      disabled={disabled}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
      maxLength={maxLength}
      className={`${wh} ${paddingSize} border-${borderWidth} border-${borderColor} bg-${bgColor} text-${textColor} text-${fontSize} m-auto font-${fontWeight} ${rounded} focus:outline-none focus:border-${onFocuesBorderColor}`}
    />
  );
};

export default DefaultInput;
