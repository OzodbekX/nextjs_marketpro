export let normalizePrice = (str, chunk = 3) => {
  if (str === 0 || str === "0") {
    return str;
  }
  if (!str) {
    return "";
  }
  if (typeof str !== "string") {
    str = String(str);
  }

  //* Localization check
  if (str.indexOf(".") !== -1) {
    //* Seperate decimal and inregral parts
    let [decimalPart, integralPart] = str.split(".");

    //* Make it easy to append to the result
    let reverseDecimal = decimalPart.split("").reverse().join("");

    //* Result to store
    let result = "";
    for (let i = 0; i < reverseDecimal.length; i += chunk) {
      //* Append three digits
      result += reverseDecimal.slice(i, i + chunk);

      //* Append seperating space only if it is not last chunk
      if (i + chunk < reverseDecimal.length) result += " ";
    }

    //* The `.` has been removed so we add it
    return (
      result.split("").reverse().join("") + "." + integralPart.substring(0, 2)
    );
  } else {
    let reverseDecimal = str.split("").reverse().join("");

    //* Result to store
    let result = "";
    for (let i = 0; i < reverseDecimal.length; i += chunk) {
      //* Apped three digits
      result += reverseDecimal.slice(i, i + chunk);

      //* Append seperating space only if it is not last chunk
      if (i + chunk < reverseDecimal.length) result += " ";
    }

    return result.split("").reverse().join("");
  }
};

export const normalizePhoneNumber = (number) => {
  if (!number.length) {
    return number;
  }

  let value = "+" + number.substr(0, 3) + " ";

  if (number.length < 4) {
    return value;
  }

  value += number.substr(3, 2) + " ";

  if (number.length < 6) {
    return value;
  }

  value += number.substr(5, 3) + " ";

  if (number.length < 9) {
    return value;
  }

  return value + number.slice(8);
};

export const makeFirstCapital = (str = "") => {
  if (!str) {
    return;
  }
  return str[0].toUpperCase() + str.slice(1);
};

export const makeArray = (len, first) => {
  if (!first) {
    return new Array(len).fill(0).map((e, i) => i + 1);
  }

  return new Array(len).fill(first).map((e, i) => e + i);
};

export const changeArrToSelect = (arr) =>
  arr.map((e, i) => ({ label: e, value: e }));

export const divideArr = (arr, length, slideCount) => {
  if (arr.length <= length) {
    return arr;
  }

  let returnArr = [];
  let hasResidue = (arr.length - length) % slideCount !== 0;
  let subCount = Math.trunc((arr.length - length) / slideCount) + 1;

  if (hasResidue) {
    subCount++;
  }

  for (let i = 0; i < subCount; i++) {
    if (
      i === subCount - 1 &&
      arr.slice(slideCount * i, slideCount * i + length).length < length
    ) {
      returnArr.push(arr.slice(slideCount * i - 1, slideCount * i + length));
    } else {
      returnArr.push(arr.slice(slideCount * i, slideCount * i + length));
    }
  }

  console.log(returnArr);

  return returnArr;
};

export const splitArr = (arr, splitLength, fillValue = null) => {
  let residue = arr.length % splitLength;
  let subCount = Math.trunc(arr.length / splitLength);
  let result = [];

  for (let i = 0; i < subCount; i++) {
    let tmpArr = [];
    for (let j = 0; j < splitLength; j++) {
      tmpArr.push(arr[i * splitLength + j]);
    }
    result.push(tmpArr);
  }

  if (residue) {
    let tmpArr = [];
    for (let j = 0; j < splitLength; j++) {
      let tmp = fillValue;
      if (arr[subCount * splitLength + j]) {
        tmp = arr[subCount * splitLength + j];
      }
      tmpArr.push(tmp);
    }
    result.push(tmpArr);
  }

  return result;
};

export const calculateSalePercent = (oldPrice, newPrice) =>
  100 - ((newPrice / oldPrice) * 100).toFixed(0);

export const selectBannerHorizontalSection = (
  bannerHorizontal,
  minRange,
  maxRange
) =>
  bannerHorizontal.filter(
    (banner, index) => index >= minRange && index <= maxRange
  );

export const selectBannerVerticalSection = (bannerVertical, count) =>
  bannerVertical.filter((banner, index) => count === index);
