import React from "react";

const AllSales = ({ action }) => {
  return (
    <li className="w-64 m-3 rounded">
      <img src={action.img} alt={action.alt} />

      {action.icon ? (
        <p className="relative w-28 bottom-5 pl-2 bg-gray-200 rounded font-bold text-sm">
          {action.date + " " + action.icon}
        </p>
      ) : action.date ? (
        <p className="relative w-24 bottom-5 pl-2 bg-gray-200 rounded font-bold text-sm">
          {action.date}
        </p>
      ) : null}

      <p className="relative bottom-3 text-sm font-bold">{action.title}</p>
    </li>
  );
};

export default AllSales;
