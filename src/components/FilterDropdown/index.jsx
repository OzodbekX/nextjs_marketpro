import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const FilterDropdown = () => {
  const options = [
    { value: "Популярные", label: "Популярные" },
    { value: "Новинки", label: "Новинки" },
    {
      value: "Сначала дешевые",
      label: "Сначала дешевые",
      className: "myOptionClassName",
    },
    {
      value: "Сначала дорогие",
      label: "Сначала дорогие",
    },
    {
      value: "По размеру скидки",
      label: "По размеру скидки",
    },
    {
      value: "Высокий рейтинг",
      label: "Высокий рейтинг",
    },
  ];
  const defaultOption = options[0];
  return (
    <div className="w-1/6 text-sm">
      <Dropdown
        className="border-white"
        options={options}
        value={defaultOption}
        placeholder="Select an option"
      />
    </div>
  );
};

export default FilterDropdown;
