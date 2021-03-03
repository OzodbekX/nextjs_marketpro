import React, { useRef, useState } from "react";
import Swiper from "react-id-swiper";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const SwiperContainer = ({
  loop,
  count,
  pagination,
  roundedControls,
  children,
}) => {
  const ref = useRef(null);

  const [current, setCurrent] = useState(0);

  const [mouseMoveValues, setMouseMoveValues] = useState([false, false]);

  const params = {
    slidesPerView: 1,
    speed: 200,
    grabCursor: false,
    autoPlay: true,
    loop: loop,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  const goNext = () => {
    if (ref.current && ref.current.swiper) {
      if (loop) {
        if (current < count - 1) {
          setTimeout(() => {
            setCurrent(current + 1);
          }, 200);
        } else {
          if (current === count - 1) {
            setTimeout(() => {
              setCurrent(0);
            }, 200);
          }
        }
      } else {
        if (current < count - 1) {
          setCurrent(current + 1);
        }
      }
      ref.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (ref.current && ref.current.swiper) {
      if (loop) {
        if (current > 0) {
          setTimeout(() => {
            setCurrent(current - 1);
          }, 200);
        } else {
          if (current === 0) {
            setTimeout(() => {
              setCurrent(count - 1);
            }, 200);
          }
        }
      } else {
        if (current > 0) {
          setCurrent(current - 1);
        }
      }
      ref.current.swiper.slidePrev();
    }
  };

  return (
    <div className="relative w-full cursor-pointer">
      {loop || current ? (
        <div
          className={`absolute top-0 bottom-0 z-10 flex items-center ${
            roundedControls ? "-left-10" : "left-0"
          }`}
        >
          {roundedControls ? (
            <div
              onMouseMove={() => setMouseMoveValues([true, false])}
              onMouseLeave={() => setMouseMoveValues([false, false])}
              className={`rounded-3xl p-1 cursor-pointer ${
                mouseMoveValues[0] ? "bg-customBlue1" : "bg-white shadow-xl"
              }`}
            >
              <HiOutlineChevronLeft
                size={32}
                onClick={goPrev}
                color={mouseMoveValues[0] ? "#fff" : "#000"}
              />
            </div>
          ) : (
            <HiOutlineChevronLeft
              size={30}
              color={"#fff"}
              onClick={goPrev}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      ) : null}
      {loop || current !== count - 1 ? (
        <div
          className={`absolute top-0 bottom-0 z-10 flex items-center ${
            roundedControls ? "-right-10" : "right-0"
          }`}
        >
          {roundedControls ? (
            <div
              onMouseMove={() => setMouseMoveValues([false, true])}
              onMouseLeave={() => setMouseMoveValues([false, false])}
              className={`rounded-3xl p-1 cursor-pointer ${
                mouseMoveValues[1] ? "bg-customBlue1" : "bg-white shadow-xl"
              }`}
            >
              <HiOutlineChevronRight
                size={32}
                onClick={goNext}
                color={mouseMoveValues[1] ? "#fff" : "#000"}
              />
            </div>
          ) : (
            <HiOutlineChevronRight
              size={30}
              color={"#fff"}
              onClick={goNext}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      ) : null}
      {pagination ? (
        <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center">
          {Array(count)
            .fill(0)
            .map((e, i) => (
              <div
                className={`w-2 h-2 rounded bg-white ${
                  i !== count ? "mr-2" : ""
                } ${i === current ? "opacity-50" : "opacity-10"}`}
              />
            ))}
        </div>
      ) : null}
      <Swiper ref={ref} {...params}>
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperContainer;
