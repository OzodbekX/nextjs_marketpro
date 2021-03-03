import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { MdLocalShipping, MdLocationCity, MdPayment } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import ShippingInfo from "../../components/ShippingInfo";
import DeliveryInfo from "../../components/DeliveryInfo";
import Payment from "../../components/Payment";
import Confirmation from "../../components/Confirmation";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const orderSteps = [
  {
    title: "1. My Cart",
    icon: <FiShoppingCart size={28} />,
  },
  {
    title: "2. Shipping Info",
    icon: <MdLocationCity color={""} size={28} />,
  },
  {
    title: "3. Delivery Info",
    icon: <MdLocalShipping size={28} />,
  },
  {
    title: "4. Payment",
    icon: <MdPayment size={28} />,
  },
  {
    title: "5. Confirmation",
    icon: <GiConfirmed size={28} />,
  },
];

const OrderPage = () => {
  const [shipInfo, setShipInfo] = useState(true);
  const [deliverInfo, setDeliveryInfo] = useState(false);
  const [payment, setPayment] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const md = useMediaQuery(768);

  return (
    <div>
      <div
        className={`${
          !md
            ? "flex flex-row justify-around mt-10 w-3/4 m-auto"
            : "grid grid-cols-4 items-center my-10"
        }`}
      >
        {orderSteps.map((step, index) => (
          <div
            className={`flex justify-around ${
              md && index === orderSteps.length - 1
                ? "col-span-4 pt-4"
                : "col-span-2 pt-4"
            } items-center`}
          >
            <div
              className={`flex flex-col items-center font-bold 
              ${index === 0 && "text-green-400"} text-gray-400 ${
                index === 1 && shipInfo === true ? "text-red-500" : ""
              }
              ${index === 2 && deliverInfo === true ? "text-red-500" : ""}
              ${index === 3 && payment === true ? "text-red-500" : ""}
              ${index === 4 && confirmation === true ? "text-red-500" : ""}
              ${shipInfo === false && index === 1 ? "text-green-400" : ""} 
              
              ${
                deliverInfo === false && shipInfo === false && index === 2
                  ? "text-green-400"
                  : ""
              } 
              ${
                shipInfo === false &&
                deliverInfo === false &&
                payment === false &&
                index === 3
                  ? "text-green-400"
                  : ""
              } 
              ${
                shipInfo === false &&
                deliverInfo === false &&
                payment === false &&
                index === 4
                  ? "text-green-400"
                  : ""
              }
              `}
            >
              <div>{step.icon}</div>
              <p>{step.title}</p>
            </div>
            {index !== orderSteps.length - 1 && (
              <span
                className={`${!md ? "ml-10" : "ml-4"} text-2xl text-gray-300`}
              >
                &#10095;
              </span>
            )}
          </div>
        ))}
      </div>
      {/* Component Here */}
      {shipInfo && (
        <ShippingInfo
          setDeliveryInfo={setDeliveryInfo}
          setShipInfo={setShipInfo}
        />
      )}
      {deliverInfo && (
        <DeliveryInfo
          setPayment={setPayment}
          setDeliveryInfo={setDeliveryInfo}
        />
      )}
      {payment && (
        <Payment setPayment={setPayment} setConfirmation={setConfirmation} />
      )}
      {confirmation && <Confirmation />}
    </div>
  );
};

export default OrderPage;
