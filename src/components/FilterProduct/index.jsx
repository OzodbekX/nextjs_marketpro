import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { base_url } from "../../constants";

const FilterProduct = ({ product }) => {
  return (
    <div className="flex w-7/12 border-t-2 border-b-2 border-gray-200 justify-between py-4 my-4">
      <div className="image-holder w-1/5 h-full ">
        <img
          className="w-32 h-40"
          src={`${base_url}${product.thumbnail_image}`}
          alt=""
        />
      </div>
      <div className="product-info h-full  text-sm font-semibold">
        <h2 className="mb-2 hover:text-blue-600 cursor-pointer">
          {product.name}
        </h2>
        <p className="text-gray-500">
          Диагональ экрана, дюймы:<span className="text-gray-800"> 6.67</span>
        </p>
        <p className="text-gray-500">
          Оперативная память:<span className="text-gray-800"> 6 ГБ</span>
        </p>
        <p className="text-gray-500">
          Встроенная память: <span className="text-gray-800"> 128 ГБ</span>
        </p>
        <p className="text-gray-500">
          Разрешение основной камеры, Мпикс
          <span className="text-gray-800"> 64</span>
        </p>
        <p className="text-gray-500">
          Процессор:
          <span className="text-gray-800">
            {" "}
            Snapdragon 720G (8 ядер), 2.3 ГГц
          </span>
        </p>
        <p className="text-gray-500 mt-2">
          MARKETPLACE, доставка и склад:
          <span className="text-blue-600 cursor-pointer"> MARKETPLACE</span>
        </p>
      </div>
      <div className="product-price flex flex-col justify-between">
        <div>
          <h1 className="font-bold">23 980 ₽</h1>
          <p className="bg-yellow-200 rounded w-28 ">
            2 398 ₽ <span className="text-xs">× 12 мес</span>
          </p>
          <p className="text-gray-500 text-sm">23 480 ₽ с Premium</p>
        </div>
        <div className="button-holder">
          <button className="py-2 px-4 bg-blue-500 font-semibold text-white rounded focus:outline-none hover:bg-blue-700">
            В корзину
          </button>
          <button className="py-2 rounded px-4 bg-gray-100 hover:bg-gray-200 focus:outline-none h-full ml-1 pt-1">
            <HiDotsHorizontal />
          </button>
        </div>
      </div>
      <div className="liked ">
        <button className="text-2xl focus:outline-none  hover:text-red-400">
          <FaRegHeart />
        </button>
      </div>
    </div>
  );
};

export default FilterProduct;
