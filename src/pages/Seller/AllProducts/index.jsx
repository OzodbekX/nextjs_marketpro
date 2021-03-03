import React from "react";
import SwitcherContainer from "../../../containers/SwitcherContainer";
import Switcher from "../../../components/Switcher";

const SellerAllProductsPage = () => {
  const arr = [
    { title: "Бестселлеры" },
    { title: "Новинки " },
    { title: "Высокий рейтинг" },
    { title: "Товары со скидкой" },
    { title: "Товары с Premium ценой " },
  ];

  return (
    <div>
      <div className=" w-48 justify-between items-center text-semibold">
        <p className="font-bold block">Категория</p>
        <div className="mt-2">
          <a href="#" className="text-customBlue2-hover">
            Аптека
          </a>
        </div>
        <div className="ml-4 mt-2">
          <a href="#" className="text-sm text-customBlue2-hover">
            Медицинские изделия и расходные материалы
          </a>
        </div>
        <p>Цена </p>
        <SwitcherContainer className="mt-2" switchers={arr} />
      </div>
    </div>
  );
};

export default SellerAllProductsPage;
