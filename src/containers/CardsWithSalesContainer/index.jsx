import React from "react";
import CardWithSales from "../../components/CardWithSales";

const CardsWithSalesContainer = ({ cards }) => {
  return (
    <div className="flex justify-between items-start">
      {cards.map((card, index) => (
        <CardWithSales {...card} key={index} />
      ))}
    </div>
  );
};

export default CardsWithSalesContainer;
