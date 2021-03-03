import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserLanguage } from "../../redux/selectors/user";
import { AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import {
  RiCheckboxCircleLine,
  RiDownloadLine,
  RiTruckLine,
} from "react-icons/ri";
import { BiHomeSmile } from "react-icons/bi";
import { GiTrashCan } from "react-icons/gi";

import { normalizePrice } from "../../utils";
import { strings } from "../../locales/strings";
import { useRouter } from "next/router";
import { selectSelectedCurrency } from "../../redux/selectors/app";

const OrderModal = ({ order, show, setShow, selectedCurrency }) => {
  const selectedLanguage = useSelector(({ user }) => user.language);
  const router = useRouter();

  useEffect(() => {
    if (selectedLanguage && selectedLanguage.code) {
      strings.setLanguage(selectedLanguage.code);
    }
  }, [selectedLanguage]);

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 flex justify-center lg:items-center">
        <div className="p-4 border-2 border-customGreyBottom rounded md:w-9/12 bg-white overflow-scroll">
          {/* top */}
          <div className="p-4 flex justify-between border-b-2 border-customGreyBottom">
            <div className="text-xl text-customGreyText font-bold capitalize">
              {strings.orderId}: {order.id}
            </div>
            <div
              onClick={() => setShow(!show)}
              className="text-2xl text-customGreyText cursor-pointer"
            >
              <AiOutlineClose />
            </div>
          </div>

          {/* icons */}
          <div className="py-5 px-12 relative flex justify-between items-center">
            <div className={`text-3xl text-customGreen`}>
              <FiFileText />
            </div>
            <div
              style={{ height: "3px" }}
              className={`w-1/4 bg-customLightGray`}
            />
            <div
              className={`text-3xl ${
                order.payment_status === "paid"
                  ? "text-customGreen"
                  : "text-customGreyText"
              }`}
            >
              <RiCheckboxCircleLine />
            </div>
            <div
              style={{ height: "3px" }}
              className={`w-1/4 bg-customLightGray`}
            />
            <div className="text-3xl text-customGreyText">
              <RiTruckLine />
            </div>
            <div
              style={{ height: "3px" }}
              className={`w-1/4 bg-customLightGray`}
            />
            <div className="text-3xl text-customGreyText">
              <BiHomeSmile />
            </div>
          </div>

          {/* order summary */}
          <div className="shadow-all rounded mb-4">
            {/* title */}
            <div className="py-5 px-12 border-b-2 border-customGreyBottom text-base font-bold">
              {strings.orderSummary}
            </div>

            {/* order info */}
            <div className="py-5 px-12 grid grid-cols-2 text-sm">
              <div className="px-6 col-span-2 lg:col-span-1">
                <div className="flex justify-between">
                  <ul className="w-full">
                    <li className="mb-3 capitalize">{strings.orderCode}:</li>
                    <li className="mb-3 capitalize">{strings.customer}:</li>
                    <li className="mb-3 capitalize">email:</li>
                    <li className="mb-3 capitalize">
                      {strings.shippingAddress}:
                    </li>
                  </ul>
                  <ul className="text-customLightBlack">
                    {/* - */}
                    {order.code ? (
                      <li className="mb-3">{order.code}</li>
                    ) : (
                      <li className="mb-3">-</li>
                    )}
                    {/* - */}
                    <li className="mb-3">-</li>
                    {/* - */}
                    {order.shipping_address.email ? (
                      <li className="mb-3">{order.shipping_address.email}</li>
                    ) : (
                      <li className="mb-3">-</li>
                    )}
                    {/* - */}
                    {order.shipping_address.country ||
                    order.shipping_address.city ||
                    order.shipping_address.address ? (
                      <li className="mb-3">
                        {order.shipping_address.country}
                        {order.shipping_address.city}
                        {order.shipping_address.address}
                      </li>
                    ) : (
                      <li className="mb-3">-</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="px-6 col-span-2 lg:col-span-1">
                <div className="flex justify-between">
                  <ul className="">
                    <li className="mb-3">{strings.orderDate}:</li>
                    <li className="mb-3">{strings.orderStatus}:</li>
                    <li className="mb-3">{strings.totalOrderAmount}:</li>
                    <li className="mb-3">{strings.shippingMethod}:</li>
                    <li className="mb-3">{strings.paymentMethod}:</li>
                  </ul>
                  <ul className="text-customLightBlack">
                    {/* - */}
                    {order.date ? (
                      <li className="mb-3">{order.date}</li>
                    ) : (
                      <li className="mb-3">-</li>
                    )}
                    <li className="mb-3">-</li>
                    <li className="mb-3">-</li>
                    <li className="mb-3">-</li>
                    <li className="mb-3">-</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* order detail,  order ammount */}
          <div className="grid gap-4 grid-cols-4">
            <div className="shadow-all rounded col-span-4 lg:col-span-3">
              {/* title */}
              <div className="py-5 px-12 border-b-2 border-customGreyBottom text-base font-bold">
                {strings.orderDetail}
              </div>

              {/* order-detail */}
              <div className="table w-full py-5 px-12 text-sm">
                <table className="table-row-group w-max text-center">
                  <div className="table-row">
                    <div className="table-cell">#</div>
                    <div className="table-cell">{strings.product}</div>
                    <div className="table-cell">{strings.amount}</div>
                    <div className="table-cell">{strings.price}</div>
                    <div className="table-cell">{strings.return}</div>
                    <div className="table-cell">{strings.variation}</div>
                    <div className="table-cell">{strings.deliveryType}</div>
                  </div>
                  {order.ordered_products.data.map((ordered_product, index) => (
                    <div className="table-row">
                      <div className="table-cell">{index + 1}</div>
                      <div
                        className="table-cell cursor-pointer text-customBlue1-hover"
                        onClick={() =>
                          router.push(
                            `/product/${ordered_product.product.slug}`
                          )
                        }
                      >
                        {ordered_product.product.name}
                      </div>
                      <div className="table-cell">
                        {ordered_product.quantity}
                      </div>
                      <div className="table-cell">
                        {selectedCurrency.symbol}{" "}
                        {normalizePrice(
                          (
                            ordered_product.price *
                            selectedCurrency.exchange_rate
                          )
                            .toFixed(0)
                            .toString()
                        )}
                      </div>
                      <div className="table-cell">N/A</div>
                    </div>
                  ))}
                </table>
              </div>
            </div>

            <div className="shadow-all rounded col-span-4 lg:col-span-1">
              {/* title */}
              <div className="py-5 px-12 border-b-2 border-customGreyBottom text-base font-bold">
                {strings.orderAmount}
              </div>
              {/* order-amount */}
              <div className="py-5 px-12 text-sm">
                <ul>
                  <li className="mb-4 flex justify-between">
                    <div className="text-customLightBlack">
                      {strings.subtotal}
                    </div>
                    <div>
                      {selectedCurrency.symbol}{" "}
                      {normalizePrice(
                        (order.grand_total * selectedCurrency.exchange_rate)
                          .toFixed(0)
                          .toString()
                      )}
                    </div>
                  </li>
                  <li className="mb-4 flex justify-between">
                    <div className="text-customLightBlack">
                      {strings.shipping}
                    </div>
                    <div>$ 0,000</div>
                  </li>
                  <li className="mb-4 flex justify-between">
                    <div className="text-customLightBlack">{strings.tax}</div>
                    <div>$ 0,000</div>
                  </li>
                  <li className="mb-4 flex justify-between">
                    <div className="text-customLightBlack">
                      {strings.coupon}
                    </div>
                    <div>$ 0,000</div>
                  </li>
                  <li className="mb-4 flex justify-between">
                    <div className="text-customLight text-customLightBlack border-b border-customGreyBottomBlack">
                      {strings.total}
                    </div>
                    <div className="font-bold">
                      {selectedCurrency.symbol}{" "}
                      {normalizePrice(
                        (order.grand_total * selectedCurrency.exchange_rate)
                          .toFixed(0)
                          .toString()
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Order = ({ orders, language, selectedCurrency }) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (language && language.code) {
      strings.setLanguage(language.code);
    }
  }, [language]);

  return (
    <>
      {show && (
        <OrderModal
          order={orders[selected]}
          show={show}
          setShow={setShow}
          selectedCurrency={selectedCurrency}
        />
      )}
      <div className="bg-customLightGray rounded">
        <div className="py-5 px-12 text-customLightBlack border-b border-customGreyBottom font-bold capitalize">
          {strings.purchaseHistory}
        </div>
        <div className="py-5 px-12 table w-full">
          <div className="table-row-group text-sm">
            <div className="table-row text-customLightBlack border-b border-customGreyBottom">
              {/* 1 */}
              <div className="table-cell py-4 text-left font-bold">
                {strings.code}
              </div>
              {/* 2 */}
              <div className="hidden md:table-cell text-center font-bold">
                {strings.date}
              </div>
              {/* 3 */}
              <div className="table-cell text-center font-bold capitalize">
                {strings.amount}
              </div>
              {/* 4 */}
              <div className="hidden md:table-cell text-center font-bold">
                {strings.deliveryStatus}
              </div>
              {/* 5 */}
              <div className="hidden md:table-cell text-center font-bold">
                {strings.paymentStatus}
              </div>
              {/* 6 */}
              <div className="table-cell text-right font-bold">
                {strings.options}
              </div>
            </div>
            {orders.map((item, index) => (
              <div className="table-row">
                {/* 1 */}
                {item.code && (
                  <div
                    onClick={() => {
                      setSelected(index);
                      setShow(!show);
                    }}
                    className="table-cell py-4 text-customBlue1 cursor-pointer text-customBlue2-hover"
                  >
                    {item.code}
                  </div>
                )}
                {/* 2 */}
                <div className="text-center hidden md:table-cell">
                  05-02-2021
                </div>
                {/* 3 */}
                <div className="text-center table-cell" />
                {/* 4 */}
                <div className="text-center hidden md:table-cell" />
                {/* 5 */}
                <div className="text-center hidden md:table-cell">
                  {item.payment_status && (
                    <div className="text-center w-min px-1 m-auto text-white rounded bg-red-600">
                      {item.payment_status}
                    </div>
                  )}
                </div>
                {/* 6 */}
                <div className="text-center table-cell">
                  <div className="flex flex-col sm:flex-row items-end justify-end text-lg">
                    <div className="flex justify-center bg-red-500 rounded-full cursor-pointer p-1 text-white m-2">
                      <GiTrashCan />
                    </div>
                    <div
                      onClick={() => {
                        setSelected(index);
                        setShow(!show);
                      }}
                      className="flex justify-center bg-blue-300 rounded-full cursor-pointer p-1 text-white m-2"
                    >
                      <AiOutlineEye />
                    </div>
                    <div className="flex justify-center bg-yellow-200 rounded-full cursor-pointer p-1 text-white m-2">
                      <RiDownloadLine />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  language: selectUserLanguage,
  selectedCurrency: selectSelectedCurrency,
});

export default connect(mapStateToProps)(Order);
