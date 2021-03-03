import React, { useState } from "react";
import moment from "moment";

const CardWithSales = (props) => {
  const { to, percent, newPrice, oldPrice, unit, photos } = props;

  const [showImg, setShowImg] = useState(photos.length - 1);

  return (
    <div className="bg-gray-100 w-min px-4 py-4 m-6 relative">
      <div className="bg-gray-100 text-customDarkBlue py-0.5 px-1 -top-2.5 left-2 text-sm font-bold rounded-sm">
        {`до ${moment(to).format("DD.MM")}`}
      </div>
      <div className="absolute bg-customPink text-white py-0.5 px-2 -top-2.5 right-2 text-sm font-bold rounded-sm">{`- ${percent} %`}</div>
      <div className="w-44 h-44 relative mt-1">
        {photos.length === 2 ? (
          <>
            <div
              onMouseMove={() => setShowImg(0)}
              onMouseLeave={() => setShowImg(1)}
              className={`w-24 h-24 bg-white absolute shadow-md rounded py-2 top-0 left-0 ${
                showImg === 0 ? "z-10" : "z-0"
              }`}
            >
              <img
                alt="img"
                className="w-full h-full object-contain"
                src={photos[0]}
              />
            </div>
            <div
              className={`w-24 h-24 bg-white absolute shadow-md rounded bottom-0 right-0 ${
                showImg === 1 ? "z-10" : "z-0"
              }`}
            >
              <img
                alt="img"
                className="w-full h-full object-contain"
                src={photos[1]}
              />
            </div>
          </>
        ) : photos.length === 3 ? (
          <>
            <div
              onMouseMove={() => setShowImg(0)}
              onMouseLeave={() => setShowImg(2)}
              className={`w-24 h-24 bg-white absolute shadow-md rounded py-2 top-0 left-0 ${
                showImg === 0 ? "z-30" : "z-0"
              }`}
            >
              <img
                alt="img"
                className="w-full h-full object-contain"
                src={photos[0]}
              />
            </div>
            <div
              onMouseMove={() => setShowImg(1)}
              onMouseLeave={() => setShowImg(2)}
              className={`w-24 h-24 bg-white absolute shadow-md rounded bottom-10 right-0 ${
                showImg === 1 ? "z-30" : "z-10"
              }`}
            >
              <img
                alt="img"
                className="w-full h-full object-contain"
                src={photos[1]}
              />
            </div>
            <div
              className={`w-24 h-24 bg-white absolute shadow-md rounded bottom-0 right-10 ${
                showImg === 2 ? "z-30" : "z-20"
              }`}
            >
              <img
                alt="img"
                className="w-full h-full object-contain"
                src={photos[2]}
              />
            </div>
          </>
        ) : photos.length === 4 ? (
          <>
            <div
              onMouseMove={() => setShowImg(0)}
              onMouseLeave={() => setShowImg(3)}
              className={`w-24 h-24 bg-white absolute shadow-md rounded py-2 top-0 left-10 ${
                showImg === 0 ? "z-40" : "z-0"
              }`}
            >
              <img
                alt="img"
                className="w-full h-full object-contain"
                src={photos[0]}
              />
            </div>
            <div
              onMouseMove={() => setShowImg(1)}
              onMouseLeave={() => setShowImg(3)}
              className={`w-24 h-24 bg-white absolute shadow-md rounded bottom-10 right-0 ${
                showImg === 1 ? "z-40" : "z-10"
              }`}
            >
              <img
                alt="img"
                className="w-full h-full object-contain"
                src={photos[1]}
              />
            </div>
            <div
              onMouseMove={() => setShowImg(2)}
              onMouseLeave={() => setShowImg(3)}
              className={`w-24 h-24 bg-white absolute shadow-md rounded bottom-0 right-10 ${
                showImg === 2 ? "z-40" : "z-20"
              }`}
            >
              <img
                alt="img"
                className="w-full h-full object-contain"
                src={photos[2]}
              />
            </div>
            <div
              className={`w-24 h-24 bg-white absolute shadow-md rounded bottom-10 left-0 ${
                showImg === 3 ? "z-40" : "z-30"
              }`}
            >
              <img
                alt="img"
                className="w-full h-full object-contain"
                src={photos[3]}
              />
            </div>
          </>
        ) : null}
      </div>
      <div className="flex mt-2 justify-between items-center">
        <div>
          <p className="text-xs text-customDarkBlue relative">
            <span className="bg-customPink h-px w-full absolute top-1/2" />
            {`${oldPrice} ${unit}`}
          </p>
          <p className="text-sm font-bold text-customPink">{`${newPrice} ${unit}`}</p>
        </div>
        <div className="cursor-pointer bg-customBlue1 bg-customBlue2-hover text-white text-sm font-bold py-1 px-3 rounded">
          {"Посмотреть"}
        </div>
      </div>
    </div>
  );
};

export default CardWithSales;
